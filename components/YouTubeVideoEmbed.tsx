"use client";

type Props = {
  /** YouTube watch URL or video id */
  src: string;
  caption?: string;
  externalUrl?: string;
};

function youtubeId(src: string): string | null {
  const trimmed = src.trim();
  if (/^[\w-]{6,}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const parts = url.pathname.split("/").filter(Boolean);
    if (
      (parts[0] === "embed" ||
        parts[0] === "shorts" ||
        parts[0] === "live" ||
        parts[0] === "v") &&
      parts[1]
    ) {
      return parts[1];
    }
  } catch {
    return null;
  }
  return null;
}

export default function YouTubeVideoEmbed({
  src,
  caption,
  externalUrl,
}: Props) {
  const id = youtubeId(src);
  if (!id) return null;

  const watchUrl =
    externalUrl?.trim() || `https://www.youtube.com/watch?v=${id}`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    id,
  )}?rel=0`;

  return (
    <figure className="overflow-hidden border border-line bg-navy">
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={embedSrc}
          title={caption || "YouTube video"}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="border-t border-line bg-white px-4 py-3 sm:px-5">
        {caption ? <p className="text-sm text-muted">{caption}</p> : null}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:text-emerald"
        >
          Watch on YouTube →
        </a>
      </div>
    </figure>
  );
}
