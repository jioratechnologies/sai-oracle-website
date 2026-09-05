export default function SocialLinks({
  links,
  dark = false,
}: {
  links: { href: string; label: string; icon: React.ReactNode }[];
  dark?: boolean;
}) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          title={l.label}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            dark
              ? "border-cream-100/30 text-cream-100 hover:bg-cream-100/10"
              : "border-maroon-200 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50"
          }`}
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
}

export function socialIcons(): Record<string, React.ReactNode> {
  return {
    Instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    Facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
      </svg>
    ),
    YouTube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.4 12 31 31 0 0 0 22 8.2ZM10 15V9l5.2 3L10 15Z" />
      </svg>
    ),
    WhatsApp: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 13.9c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.5-.5.5c-.1.2-.3.3-.1.6.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .5-.2 1.1Z" />
      </svg>
    ),
    X: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]" aria-hidden>
        <path d="M17.7 3H21l-7.1 8.2L22.2 21h-6.6l-5.1-6.1L4.6 21H1.3l7.6-8.8L1.8 3h6.7l4.6 5.6L17.7 3Zm-1.2 16h1.8L7.1 4.9H5.2L16.5 19Z" />
      </svg>
    ),
  };
}

export function buildSocialLinks(settings: {
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  whatsapp_url: string;
  x_url: string;
}): { href: string; label: string; icon: React.ReactNode }[] {
  const icons = socialIcons();
  const entries: [string, string][] = [
    ["Instagram", settings.instagram_url],
    ["Facebook", settings.facebook_url],
    ["YouTube", settings.youtube_url],
    ["WhatsApp", settings.whatsapp_url],
    ["X", settings.x_url],
  ];
  return entries
    .filter(([, href]) => href && href.trim().length > 0)
    .map(([label, href]) => ({ href, label, icon: icons[label] }));
}
