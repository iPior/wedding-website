"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { logger } from "@/lib/logger";
import { normalizeLocale } from "@/lib/locale";
import { weddingConfig } from "../../wedding.config";
import BroadcastEmail from "@/emails/broadcast";

const broadcastSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Message body is required"),
});

export type BroadcastResult = {
  success: boolean;
  sentCount: number;
  error?: string;
};

export async function sendBroadcastEmail(formData: FormData): Promise<BroadcastResult> {
  const requestId = randomUUID();
  const parsed = broadcastSchema.safeParse({
    subject: formData.get("subject"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join("; ");
    return { success: false, sentCount: 0, error: msg };
  }

  const { subject, body } = parsed.data;

  // Get all subscribed entries with guest info
  const subscribers = await prisma.mailingListEntry.findMany({
    where: { subscribed: true },
    select: {
      email: true,
      guest: {
        select: {
          firstName: true,
          lastName: true,
          household: {
            select: {
              preferredLocale: true,
            },
          },
        },
      },
    },
  });

  if (subscribers.length === 0) {
    return { success: false, sentCount: 0, error: "No subscribers on the mailing list" };
  }

  // Deduplicate by email address
  const uniqueEmails = new Map<string, { locale: "en" | "pl" }>();
  for (const sub of subscribers) {
    if (!uniqueEmails.has(sub.email)) {
      uniqueEmails.set(sub.email, {
        locale: normalizeLocale(sub.guest.household.preferredLocale),
      });
    }
  }

  const coupleName = `${weddingConfig.couple.person1.firstName} & ${weddingConfig.couple.person2.firstName}`;

  // Send via Resend batch (max 100 per batch)
  const emailList = Array.from(uniqueEmails.entries());
  let sentCount = 0;

  const batchSize = 100;
  for (let i = 0; i < emailList.length; i += batchSize) {
    const batch = emailList.slice(i, i + batchSize);

    try {
      await resend.batch.send(
        batch.map(([email, recipient]) => ({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject,
          react: BroadcastEmail({
            subject,
            body,
            coupleName,
            locale: recipient.locale,
          }),
        }))
      );
      sentCount += batch.length;
    } catch (err) {
      logger.error(
        "emails.broadcast.batch_failed",
        { requestId, batchStart: i, sentCount, totalRecipients: emailList.length },
        err,
      );
      Sentry.captureException(err, {
        tags: { action: "sendBroadcastEmail", integration: "resend" },
        extra: { requestId, batchStart: i, sentCount, totalRecipients: emailList.length },
      });
      return {
        success: false,
        sentCount,
        error: `Failed after sending ${sentCount} of ${emailList.length} emails`,
      };
    }
  }

  revalidatePath("/admin/emails");

  return { success: true, sentCount };
}
