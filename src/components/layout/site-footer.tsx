import { weddingConfig } from "../../../wedding.config";

export function SiteFooter() {
  const { couple, date, registry } = weddingConfig;

  return (
    <footer className="mt-16 border-t pb-8 pt-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-playfair text-sm font-medium">
          {couple.person1.firstName} & {couple.person2.firstName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </footer>
  );
}
