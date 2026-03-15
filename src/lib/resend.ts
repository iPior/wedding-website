import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailInput = Parameters<typeof resend.emails.send>[0];

export async function sendEmail(payload: SendEmailInput) {
  const captureFile = process.env.TEST_EMAIL_CAPTURE_FILE;
  if (captureFile) {
    const { appendFile } = await import("node:fs/promises");
    const reactNode = payload.react as { props?: Record<string, unknown> } | undefined;
    const record = JSON.stringify({
      to: payload.to,
      subject: payload.subject,
      from: payload.from,
      sentAt: new Date().toISOString(),
      hasReact: Boolean(reactNode),
      modifyUrl:
        reactNode && typeof reactNode.props?.modifyUrl === "string"
          ? reactNode.props.modifyUrl
          : null,
      locale:
        reactNode && typeof reactNode.props?.locale === "string"
          ? reactNode.props.locale
          : null,
      html: payload.html ?? null,
      text: payload.text ?? null,
    });
    await appendFile(captureFile, `${record}\n`, "utf8");
    return { data: { id: "captured" }, error: null } as const;
  }

  return resend.emails.send(payload);
}
