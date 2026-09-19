"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  adminCreateNewsPost,
  adminDeleteNewsPost,
  adminUpdateNewsPost,
} from "@/app/actions/admin-news";
import {
  blocksToParagraphText,
  embassyTodayDate,
  parseVideoEmbedUrl,
  videoEmbedFromPost,
  type ManagedNewsPost,
} from "@/lib/cms/news-shared";

type ComposerMode = "create" | "edit";

type GalleryEditorItem = {
  key: string;
  /** Already-saved image URL (edit mode / kept photos). */
  src?: string;
  /** Newly chosen local file. */
  file?: File;
  previewUrl: string;
  caption: string;
};

function galleryItemsFromPost(post: ManagedNewsPost | null): GalleryEditorItem[] {
  if (!post) return [];
  const gallery = post.blocks.find((block) => block.type === "gallery");
  if (!gallery) return [];
  return gallery.images.map((image, index) => ({
    key: `existing-${post.id}-${index}-${image.src}`,
    src: image.src,
    previewUrl: image.src,
    caption: image.caption?.trim() || "",
  }));
}

export default function NewsAdminPanel({ posts }: { posts: ManagedNewsPost[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<ComposerMode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [listMessage, setListMessage] = useState<string | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  /** Keep deleted rows hidden even if a stale server refresh briefly returns them. */
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());
  /** Show create/update results immediately — don't wait on router.refresh(). */
  const [optimisticPosts, setOptimisticPosts] = useState<ManagedNewsPost[]>([]);
  const [isDeleting, startDeleteTransition] = useTransition();

  const visiblePosts = useMemo(() => {
    const byId = new Map<string, ManagedNewsPost>();
    for (const post of posts) byId.set(post.id, post);
    for (const post of optimisticPosts) byId.set(post.id, post);
    return Array.from(byId.values())
      .filter((post) => !hiddenIds.has(post.id))
      .sort((a, b) => {
        const byDate = b.date.localeCompare(a.date);
        if (byDate !== 0) return byDate;
        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [posts, optimisticPosts, hiddenIds]);

  useEffect(() => {
    setHiddenIds((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set<string>();
      for (const id of prev) {
        // Still present in props → keep hidden until the store catches up.
        if (posts.some((post) => post.id === id)) next.add(id);
      }
      return next.size === prev.size ? prev : next;
    });
  }, [posts]);

  useEffect(() => {
    if (optimisticPosts.length === 0) return;
    setOptimisticPosts((prev) => {
      const next = prev.filter((post) => {
        const server = posts.find((p) => p.id === post.id);
        if (!server) return true;
        return server.updatedAt < post.updatedAt;
      });
      return next.length === prev.length ? prev : next;
    });
  }, [posts, optimisticPosts.length]);

  const editingPost = useMemo(
    () => visiblePosts.find((post) => post.id === editingId) ?? null,
    [visiblePosts, editingId],
  );

  function startCreate() {
    setMode("create");
    setEditingId(null);
  }

  function startEdit(id: string) {
    setMode("edit");
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onPostSaved(post: ManagedNewsPost, message: string) {
    setListError(null);
    setOptimisticPosts((prev) => [
      post,
      ...prev.filter((item) => item.id !== post.id),
    ]);
    setListMessage(message);
    if (mode === "edit") startCreate();
    router.refresh();
  }

  function removePost(post: ManagedNewsPost) {
    if (!confirm(`Remove “${post.title}” from the site?`)) return;
    setListError(null);
    setListMessage(null);
    setPendingDeleteId(post.id);
    setHiddenIds((prev) => new Set(prev).add(post.id));
    setOptimisticPosts((prev) => prev.filter((item) => item.id !== post.id));
    if (editingId === post.id) startCreate();
    startDeleteTransition(async () => {
      const formData = new FormData();
      formData.set("id", post.id);
      formData.set("slug", post.slug);
      const result = await adminDeleteNewsPost(null, formData);
      setPendingDeleteId(null);
      if (!result?.ok) {
        setHiddenIds((prev) => {
          const next = new Set(prev);
          next.delete(post.id);
          return next;
        });
        setListError(result?.error || "Could not remove post.");
        return;
      }
      setListMessage(result.message || "Post removed.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-10">
      <NewsDeskComposer
        key={editingPost?.id ?? "create"}
        mode={mode}
        post={editingPost}
        onCancelEdit={startCreate}
        onSaved={onPostSaved}
      />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              News room
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-navy">
              Published & drafts
            </h2>
          </div>
          {mode === "edit" ? (
            <button
              type="button"
              onClick={startCreate}
              className="border border-navy/20 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy hover:border-navy"
            >
              Start new briefing
            </button>
          ) : null}
        </div>

        {listError ? (
          <p
            className="border border-crimson/30 bg-[#fff7f7] px-4 py-3 text-sm text-crimson"
            role="alert"
          >
            {listError}
          </p>
        ) : null}
        {listMessage ? (
          <p
            className="border border-emerald/30 bg-[#f3faf6] px-4 py-3 text-sm text-emerald"
            role="status"
          >
            {listMessage}
          </p>
        ) : null}

        <ul className="divide-y divide-line border border-navy/10 bg-white shadow-sm">
          {visiblePosts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:px-5 sm:py-4"
            >
              <div className="relative h-24 w-full shrink-0 overflow-hidden bg-navy sm:h-[4.5rem] sm:w-28">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {post.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      post.published
                        ? "bg-emerald/15 text-emerald"
                        : "bg-[#eef1f5] text-muted"
                    }`}
                  >
                    {post.published ? "On site" : "Draft"}
                  </span>
                  <span className="text-xs text-muted">{post.dateLabel}</span>
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-navy">
                  {post.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                {post.published ? (
                  <>
                    <Link
                      href="/news"
                      target="_blank"
                      className="border border-line px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-navy hover:border-navy"
                    >
                      News index
                    </Link>
                    <Link
                      href={`/news/${post.slug}`}
                      target="_blank"
                      className="border border-line px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-navy hover:border-navy"
                    >
                      Open article
                    </Link>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => startEdit(post.id)}
                  className="bg-navy px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-navy-mid"
                >
                  Revise
                </button>
                <button
                  type="button"
                  disabled={isDeleting && pendingDeleteId === post.id}
                  onClick={() => removePost(post)}
                  className="w-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-crimson hover:underline disabled:opacity-60"
                >
                  {isDeleting && pendingDeleteId === post.id
                    ? "Removing…"
                    : "Remove"}
                </button>
              </div>
            </li>
          ))}
          {visiblePosts.length === 0 ? (
            <li className="px-6 py-12 text-center text-sm text-muted">
              The desk is clear — file the first briefing above.
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}

function NewsDeskComposer({
  mode,
  post,
  onCancelEdit,
  onSaved,
}: {
  mode: ComposerMode;
  post: ManagedNewsPost | null;
  onCancelEdit: () => void;
  onSaved: (post: ManagedNewsPost, message: string) => void;
}) {
  const router = useRouter();
  const action = mode === "edit" ? adminUpdateNewsPost : adminCreateNewsPost;
  const [state, formAction, pending] = useActionState(action, null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(
    post ? blocksToParagraphText(post.blocks) : "",
  );
  const [category, setCategory] = useState<"News" | "Announcements">(
    post?.category === "Announcements" ? "Announcements" : "News",
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    post?.image.src ?? null,
  );
  const [date, setDate] = useState(post?.date ?? embassyTodayDate());
  const [sourceUrl, setSourceUrl] = useState(post?.sourceUrl ?? "");
  const [showMeta, setShowMeta] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryEditorItem[]>(() =>
    galleryItemsFromPost(post),
  );
  const initialVideo = videoEmbedFromPost(post);
  const [videoUrl, setVideoUrl] = useState(initialVideo.url);
  const [videoCaption, setVideoCaption] = useState(initialVideo.caption);
  const handledSuccess = useRef<string | null>(null);
  const onSavedRef = useRef(onSaved);
  onSavedRef.current = onSaved;
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const coverSectionRef = useRef<HTMLDivElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const videoParse = useMemo(() => {
    const trimmed = videoUrl.trim();
    if (!trimmed) return { status: "empty" as const };
    try {
      const parsed = parseVideoEmbedUrl(trimmed);
      if (!parsed) return { status: "empty" as const };
      return { status: "ok" as const, parsed };
    } catch (error) {
      return {
        status: "error" as const,
        message:
          error instanceof Error ? error.message : "Unsupported video link.",
      };
    }
  }, [videoUrl]);

  function pickCoverPhoto() {
    coverInputRef.current?.click();
  }

  function onCoverSelected(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setCoverPreview(URL.createObjectURL(file));
  }

  function onGallerySelected(fileList: FileList | null) {
    if (!fileList?.length) return;
    const remaining = Math.max(0, 8 - galleryItems.length);
    const next = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remaining)
      .map((file, index) => ({
        key: `new-${Date.now()}-${index}-${file.name}`,
        file,
        previewUrl: URL.createObjectURL(file),
        caption: "",
      }));
    if (next.length === 0) return;
    setGalleryItems((current) => [...current, ...next].slice(0, 8));
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }

  function updateGalleryCaption(key: string, caption: string) {
    setGalleryItems((current) =>
      current.map((item) => (item.key === key ? { ...item, caption } : item)),
    );
  }

  function removeGalleryItem(key: string) {
    setGalleryItems((current) => {
      const target = current.find((item) => item.key === key);
      if (target?.file && target.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return current.filter((item) => item.key !== key);
    });
  }

  async function submitWithGallery(formData: FormData) {
    formData.delete("galleryImages");
    formData.delete("galleryCaptions");
    formData.delete("existingGallery");
    formData.set("videoEmbedUrl", videoUrl.trim());
    formData.set("videoCaption", videoCaption.trim());

    const existing = galleryItems
      .filter((item) => item.src && !item.file)
      .map((item) => ({
        src: item.src!,
        alt: item.caption.trim() || "Embassy photograph",
        caption: item.caption.trim() || undefined,
      }));
    formData.set("existingGallery", JSON.stringify(existing));

    for (const item of galleryItems) {
      if (!item.file) continue;
      formData.append("galleryImages", item.file);
      formData.append("galleryCaptions", item.caption.trim());
    }

    return formAction(formData);
  }

  useEffect(() => {
    if (!state?.ok) return;
    const token = `${state.slug ?? ""}|${state.message ?? "ok"}|${state.post?.updatedAt ?? ""}`;
    if (handledSuccess.current === token) return;
    handledSuccess.current = token;
    if (state.post) {
      onSavedRef.current(state.post, state.message || "Post saved.");
    } else {
      router.refresh();
    }
    if (mode === "create") {
      setTitle("");
      setBody("");
      setCategory("News");
      setCoverPreview(null);
      setDate(embassyTodayDate());
      setSourceUrl("");
      setShowMeta(false);
      setGalleryItems((current) => {
        for (const item of current) {
          if (item.file && item.previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(item.previewUrl);
          }
        }
        return [];
      });
      setVideoUrl("");
      setVideoCaption("");
      if (coverInputRef.current) coverInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  }, [state, mode, router]);

  useEffect(() => {
    if (!state?.error) return;
    if (!/cover photo/i.test(state.error)) return;
    coverSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [state?.error]);

  const previewDateLabel = useMemo(() => {
    const parsed = new Date(`${date}T12:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [date]);

  const wordCount = body.trim()
    ? body.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <section className="overflow-hidden border border-navy/10 bg-white shadow-[0_18px_40px_rgba(11,37,69,0.06)]">
      {/* Flag stripe — unique Embassy desk chrome */}
      <div className="flex h-1.5" aria-hidden>
        <span className="flex-1 bg-[#078930]" />
        <span className="flex-1 bg-[#FCDD09]" />
        <span className="flex-1 bg-[#DA121A]" />
      </div>

      <div className="border-b border-line bg-[#0B2545] px-5 py-5 text-white sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dbbf8a]">
              Embassy news desk
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {mode === "edit" ? "Revise briefing" : "File a briefing"}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Release once — it appears on{" "}
              <span className="text-white/90">/news</span>, the article page, and
              the homepage feed.
            </p>
          </div>
          <div className="text-right text-xs text-white/50">
            <p>{wordCount} words</p>
            <p className="mt-0.5">{category}</p>
          </div>
        </div>
      </div>

      <form action={submitWithGallery} className="lg:grid lg:grid-cols-2">
        {mode === "edit" && post ? (
          <input type="hidden" name="id" value={post.id} />
        ) : null}
        <input type="hidden" name="category" value={category} />
        <input
          type="hidden"
          name="imageSrc"
          value={
            coverPreview && !coverPreview.startsWith("blob:")
              ? coverPreview
              : (post?.image.src ?? "")
          }
        />
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="sourceUrl" value={sourceUrl} />
        <input type="hidden" name="excerpt" value="" />
        <input type="hidden" name="lede" value="" />
        <input type="hidden" name="slug" value={post?.slug ?? ""} />
        <input
          type="hidden"
          name="author"
          value={post?.author ?? "Embassy of Ethiopia in London"}
        />
        <input type="hidden" name="imageAlt" value={title || post?.image.alt || ""} />

        {/* Compose column */}
        <div className="space-y-6 border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <input
            ref={coverInputRef}
            type="file"
            name="heroImage"
            accept="image/*"
            className="sr-only"
            onChange={(event) => onCoverSelected(event.target.files)}
          />

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              1 · Headline
            </label>
            <input
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              placeholder="Clear diplomatic headline"
              className="w-full border-0 border-b border-line bg-transparent px-0 py-2 font-display text-2xl font-semibold text-navy outline-none placeholder:text-navy/25 focus:border-gold sm:text-[1.75rem]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              2 · Story
            </label>
            <textarea
              name="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              required
              rows={9}
              placeholder={
                "Write the briefing…\n\nLeave a blank line between paragraphs — they become the story body on the public page."
              }
              className="w-full resize-y border border-line bg-[#fbfcfd] px-4 py-3 text-[15px] leading-relaxed text-charcoal outline-none focus:border-navy focus:bg-white"
            />
          </div>

          <div
            ref={coverSectionRef}
            className={`space-y-3 rounded-sm border p-4 ${
              state?.error && /cover photo/i.test(state.error)
                ? "border-crimson/50 bg-[#fff7f7]"
                : "border-navy/15 bg-[#f4f6f8]"
            }`}
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  3 · Cover photo <span className="text-crimson">required</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  This is the image on /news cards and the article hero — not the
                  optional gallery below.
                </p>
              </div>
              <button
                type="button"
                onClick={pickCoverPhoto}
                className="bg-[#0B2545] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-navy-mid"
              >
                {coverPreview ? "Change cover" : "Choose cover photo"}
              </button>
            </div>

            <button
              type="button"
              onClick={pickCoverPhoto}
              className="group relative flex min-h-[10rem] w-full overflow-hidden border border-dashed border-navy/25 bg-white text-left transition hover:border-navy/45"
            >
              {coverPreview ? (
                <>
                  <span className="relative block min-h-[10rem] w-full">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={coverPreview.startsWith("blob:")}
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-navy/75 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 transition group-hover:opacity-100">
                    Change cover photo
                  </span>
                </>
              ) : (
                <span className="flex w-full flex-col items-center justify-center gap-2 px-6 py-10 text-center">
                  <span className="flex h-10 w-10 items-center justify-center border border-navy/20 bg-[#f4f6f8] font-display text-lg text-navy">
                    +
                  </span>
                  <span className="text-sm font-medium text-navy">
                    Click to add the lead photograph
                  </span>
                  <span className="text-xs text-muted">
                    JPEG, PNG, or WebP · up to 8 MB
                  </span>
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Desk
            </span>
            {(["News", "Announcements"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                  category === option
                    ? "bg-navy text-white"
                    : "border border-line text-navy hover:border-navy"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div>
            <label
              htmlFor="news-post-date"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted"
            >
              4 · Post date
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                id="news-post-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="border border-line bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-navy"
              />
              <button
                type="button"
                onClick={() => setDate(embassyTodayDate())}
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy underline-offset-2 hover:underline"
              >
                Use today
              </button>
            </div>
            <p className="mt-1.5 text-xs text-muted">
              Defaults to today’s date in London. Change it if the briefing
              happened on another day.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Extra photographs
            </label>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => onGallerySelected(event.target.files)}
              className="w-full border border-line bg-white px-3 py-2.5 text-sm file:mr-3 file:border-0 file:bg-[#0B2545] file:px-3 file:py-1.5 file:text-[10px] file:font-semibold file:uppercase file:tracking-[0.12em] file:text-white"
            />
            <p className="mt-1.5 text-xs text-muted">
              Optional gallery under the story — shown in full (not cropped).
              Add a short caption for each photo; leave blank for no caption.
            </p>

            {galleryItems.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {galleryItems.map((item, index) => (
                  <li
                    key={item.key}
                    className="grid gap-3 border border-line bg-white p-3 sm:grid-cols-[5.5rem_1fr_auto]"
                  >
                    <div className="relative h-20 overflow-hidden bg-[#0B2545]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <label className="block min-w-0 text-sm">
                      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                        Caption {index + 1}
                      </span>
                      <input
                        type="text"
                        value={item.caption}
                        onChange={(event) =>
                          updateGalleryCaption(item.key, event.target.value)
                        }
                        placeholder="Optional — e.g. Ambassador with guests"
                        className="w-full border border-line bg-[#fbfcfd] px-3 py-2 outline-none focus:border-navy focus:bg-white"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(item.key)}
                      className="self-end px-2 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-crimson hover:underline sm:self-center"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Embed video{" "}
              <span className="font-normal normal-case tracking-normal text-muted/80">
                (optional)
              </span>
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=… or Facebook reel / video"
              className="w-full border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-navy"
            />
            <p className="mt-1.5 text-xs text-muted">
              Paste a YouTube or Facebook video link. Leave blank for no embed.
            </p>
            {videoParse.status === "ok" ? (
              <p className="mt-2 text-xs font-medium text-emerald">
                Recognised as {videoParse.parsed.label} — will appear under the
                story.
              </p>
            ) : null}
            {videoParse.status === "error" ? (
              <p className="mt-2 text-xs text-crimson" role="alert">
                {videoParse.message}
              </p>
            ) : null}
            {videoUrl.trim() ? (
              <label className="mt-3 block text-sm">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  Video caption
                </span>
                <input
                  type="text"
                  value={videoCaption}
                  onChange={(event) => setVideoCaption(event.target.value)}
                  placeholder="Optional — e.g. Embassy briefing highlights"
                  className="w-full border border-line bg-[#fbfcfd] px-3 py-2 outline-none focus:border-navy focus:bg-white"
                />
              </label>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setShowMeta((value) => !value)}
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted hover:text-navy"
          >
            {showMeta ? "Hide filing details" : "Filing details"}
          </button>

          {showMeta ? (
            <div className="grid gap-3 border border-line bg-[#f4f6f8] p-4">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-charcoal">
                  Source link (X / Facebook)
                </span>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                  placeholder="https://"
                  className="w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-navy"
                />
              </label>
            </div>
          ) : null}
        </div>

        {/* Live public-site preview column */}
        <div className="bg-[#eef1f5] p-5 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Reader preview
          </p>
          <p className="mt-1 text-sm text-muted">
            How this briefing will read on /news and the article page.
          </p>

          <div className="mt-5 overflow-hidden border border-navy/10 bg-white shadow-sm">
            <button
              type="button"
              onClick={pickCoverPhoto}
              className="relative block aspect-[16/9] w-full bg-navy text-left"
              aria-label={
                coverPreview ? "Change cover photo" : "Choose cover photo"
              }
            >
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized={coverPreview.startsWith("blob:")}
                />
              ) : (
                <span className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
                  <span className="text-xs uppercase tracking-[0.16em] text-white/50">
                    Cover photo required
                  </span>
                  <span className="bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Click to choose image
                  </span>
                </span>
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-[#071528] via-[#071528]/55 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#dbbf8a]">
                  {category} · {previewDateLabel}
                </span>
                <span className="mt-2 block font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {title.trim() || "Your headline appears here"}
                </span>
              </span>
            </button>
            <div className="space-y-3 px-4 py-5 sm:px-5">
              {(body.trim()
                ? body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
                : [
                    "Paragraphs from your story will stack here — exactly like the public news articles.",
                  ]
              )
                .slice(0, 3)
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-relaxed text-charcoal/90"
                  >
                    {paragraph}
                  </p>
                ))}
              {body.split(/\n\s*\n/).filter((p) => p.trim()).length > 3 ? (
                <p className="text-xs text-muted">…continues on the full page</p>
              ) : null}
              {videoParse.status === "ok" ? (
                <div className="border border-dashed border-navy/20 bg-[#f8fafc] px-3 py-4 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {videoParse.parsed.label} embed
                  </p>
                  <p className="mt-1.5 text-xs text-muted">
                    {videoCaption.trim() ||
                      "Video plays on the published article page."}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-navy/10 pt-5">
            {state?.error ? (
              <div className="space-y-2" role="alert">
                <p className="text-sm text-crimson">{state.error}</p>
                {/cover photo/i.test(state.error) ? (
                  <button
                    type="button"
                    onClick={pickCoverPhoto}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-navy underline-offset-2 hover:underline"
                  >
                    Choose cover photo now
                  </button>
                ) : null}
              </div>
            ) : null}
            {state?.ok ? (
              <div className="space-y-2" role="status">
                <p className="text-sm text-emerald">
                  {"message" in state && state.message
                    ? state.message
                    : "Saved."}
                </p>
                {"published" in state &&
                state.published &&
                "slug" in state &&
                state.slug ? (
                  <p className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
                    <Link
                      href="/news"
                      target="_blank"
                      className="text-navy underline-offset-2 hover:underline"
                    >
                      View /news
                    </Link>
                    <Link
                      href={`/news/${state.slug}`}
                      target="_blank"
                      className="text-navy underline-offset-2 hover:underline"
                    >
                      Open article
                    </Link>
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-xs text-muted">
                Draft keeps it off the public site. Release puts it on /news, the
                article page, and the homepage.
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              {mode === "edit" ? (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="border border-line bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy"
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="submit"
                name="intent"
                value="publish"
                disabled={pending || videoParse.status === "error"}
                className="bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-navy-mid disabled:opacity-60"
              >
                {pending
                  ? "Releasing…"
                  : mode === "edit"
                    ? "Release update"
                    : "Release to site"}
              </button>
              <button
                type="submit"
                name="intent"
                value="draft"
                disabled={pending || videoParse.status === "error"}
                className="border border-navy/25 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy disabled:opacity-60"
              >
                {pending ? "Saving…" : "Hold as draft"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
