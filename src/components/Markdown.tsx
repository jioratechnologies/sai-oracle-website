import Link from "next/link";

/**
 * Minimal Markdown renderer for admin-edited temple pages.
 * Supports: ## / ### headings, **bold**, [text](url) links,
 * ![alt](src) standalone images, -/* lists, paragraphs.
 * No dependency, no raw HTML — safe by construction.
 */
export default function Markdown({ content }: { content: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={`b${key++}`} className="my-3 list-disc space-y-1.5 pl-6 marker:text-saffron-500">
        {list.map((item, i) => (
          <li key={i}>{markdownInline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushList();
      blocks.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`b${key++}`}
          src={image[2]}
          alt={image[1]}
          className="my-5 w-full rounded-2xl border border-maroon-100 object-cover shadow-sm"
        />,
      );
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`b${key++}`} className="mt-6 mb-2 font-display text-2xl font-bold text-maroon-800">
          {markdownInline(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={`b${key++}`} className="mt-8 mb-3 font-display text-3xl font-bold text-maroon-900">
          {markdownInline(line.slice(3))}
        </h2>,
      );
    } else if (/^[-*] /.test(line)) {
      list.push(line.slice(2));
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={`b${key++}`} className="my-3 leading-relaxed">
          {markdownInline(line)}
        </p>,
      );
    }
  }
  flushList();

  return <div className="text-[17px] text-stone-700">{blocks}</div>;
}

export function markdownInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-maroon-900">
          {p.slice(2, -2)}
        </strong>
      );
    }
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link key={i} href={link[2]} className="font-semibold text-saffron-700 underline underline-offset-2 hover:text-saffron-600">
          {link[1]}
        </Link>
      );
    }
    return <span key={i}>{p}</span>;
  });
}
