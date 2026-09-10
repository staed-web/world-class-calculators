/** Shared site constants — keep contact/brand strings here so they cannot drift. */

export const SITE_NAME = "MyCalcsWorld";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mycalcsworld.online";

/** Public contact inbox (Gmail). Used for mailto:, metadata, About, Contact, Privacy, Header, Footer. */
export const CONTACT_EMAIL = "mycalcsworldcontact@gmail.com";

export function contactMailto(subject?: string, body?: string): string {
  const parts: string[] = [];
  if (subject?.trim()) parts.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body?.trim()) parts.push(`body=${encodeURIComponent(body.trim())}`);
  return parts.length
    ? `mailto:${CONTACT_EMAIL}?${parts.join("&")}`
    : `mailto:${CONTACT_EMAIL}`;
}
