"use client";

type Props = {
  url: string;
  caption?: string;
};

export default function FacebookVideoEmbed({ url, caption }: Props) {
  const embedSrc = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url,
  )}&show_text=false&width=320&height=568&t=0`;

  return (
    <figure className="overflow-hidden border border-line bg-navy">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] bg-black sm:max-w-[360px]">
        <iframe
          src={embedSrc}
          title={caption || "Facebook video"}
          width={320}
          height={568}
          className="absolute inset-0 h-full w-full border-0"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="border-t border-line bg-white px-4 py-3 sm:px-5">
        {caption ? <p className="text-sm text-muted">{caption}</p> : null}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:text-emerald"
        >
          Watch on Facebook →
        </a>
      </div>
    </figure>
  );
}
