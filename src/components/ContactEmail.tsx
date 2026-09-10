import { CONTACT_EMAIL, contactMailto } from "@/lib/site";

type Props = {
  className?: string;
  href?: string | false;
};

/**
 * Renders contact email with overflow-wrap:anywhere and a soft break before @
 * so long addresses wrap cleanly instead of splitting mid-token awkwardly.
 */
export function ContactEmail({ className = "", href }: Props) {
  const at = CONTACT_EMAIL.indexOf("@");
  const local = at >= 0 ? CONTACT_EMAIL.slice(0, at) : CONTACT_EMAIL;
  const domain = at >= 0 ? CONTACT_EMAIL.slice(at + 1) : "";

  const body = (
    <span className={`email-break ${className}`}>
      {local}
      {domain ? (
        <>
          <wbr />@{domain}
        </>
      ) : null}
    </span>
  );

  if (href === false) return body;
  return (
    <a href={href ?? contactMailto()} className={`email-break ${className}`}>
      {local}
      {domain ? (
        <>
          <wbr />@{domain}
        </>
      ) : null}
    </a>
  );
}
