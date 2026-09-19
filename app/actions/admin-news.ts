"use server";

import { refresh, revalidatePath, updateTag } from "next/cache";
import { recordStaffAudit } from "@/lib/audit/record";
import { readImageFile, storePublicImage } from "@/lib/cms/media";
import {
  createNewsPost,
  deleteNewsPost,
  updateNewsPost,
} from "@/lib/cms/news";
import type { ManagedNewsPost } from "@/lib/cms/news-shared";
import type { NewsCategory } from "@/lib/content/site";
import { getSessionStaff } from "@/lib/staff/auth";
import {
  assertPermission,
  canManageNews,
} from "@/lib/staff/permissions";

async function requireNewsEditor() {
  const user = await getSessionStaff();
  if (!user) throw new Error("Unauthorized.");
  assertPermission(user, canManageNews(user.role));
  return user;
}

function revalidateNews(slug?: string) {
  // Read-your-own-writes for tagged news data + client router cache.
  updateTag("news");
  refresh();
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/news");
  revalidatePath("/news", "layout");
  revalidatePath("/news", "page");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/news/${slug}`, "page");
    revalidatePath(`/news/${slug}`, "layout");
  }
}

async function uploadNamedImage(
  formData: FormData,
  fieldName: string,
): Promise<string | null> {
  const image = await readImageFile(formData, fieldName);
  if (!image) return null;
  const stored = await storePublicImage({
    folder: "news",
    fileName: image.fileName,
    contentType: image.contentType,
    bytes: image.bytes,
  });
  return stored.url;
}

async function uploadGalleryImages(
  formData: FormData,
): Promise<{ src: string; alt: string; caption?: string }[]> {
  const files = formData
    .getAll("galleryImages")
    .filter((value): value is File => value instanceof File && value.size > 0);
  const captions = formData.getAll("galleryCaptions").map((value) => String(value));
  const uploaded: { src: string; alt: string; caption?: string }[] = [];
  for (const [index, file] of files.slice(0, 8).entries()) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 8 * 1024 * 1024) {
      throw new Error("Each gallery image must be 8 MB or smaller.");
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const stored = await storePublicImage({
      folder: "news/gallery",
      fileName: file.name || "gallery.jpg",
      contentType: file.type || "image/jpeg",
      bytes,
    });
    const caption = captions[index]?.trim() || undefined;
    uploaded.push({
      src: stored.url,
      alt: caption || "Embassy photograph",
      caption,
    });
  }
  return uploaded;
}

function readExistingGallery(
  formData: FormData,
): { src: string; alt: string; caption?: string }[] {
  const raw = String(formData.get("existingGallery") ?? "").trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const items: { src: string; alt: string; caption?: string }[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const row = item as { src?: unknown; alt?: unknown; caption?: unknown };
      const src = typeof row.src === "string" ? row.src.trim() : "";
      if (!src) continue;
      const caption =
        typeof row.caption === "string" ? row.caption.trim() : "";
      items.push({
        src,
        alt: caption || "Embassy photograph",
        ...(caption ? { caption } : {}),
      });
      if (items.length >= 8) break;
    }
    return items;
  } catch {
    return [];
  }
}

function isPublishedIntent(formData: FormData): boolean {
  const intent = String(formData.get("intent") ?? "publish");
  if (intent === "draft") return false;
  return formData.get("published") === "on" || intent === "publish";
}

export async function adminCreateNewsPost(
  _prev: {
    ok?: boolean;
    error?: string;
    message?: string;
    slug?: string;
    published?: boolean;
    post?: ManagedNewsPost;
  } | null,
  formData: FormData,
) {
  try {
    await requireNewsEditor();
    const uploadedHero = await uploadNamedImage(formData, "heroImage");
    const imageSrc =
      uploadedHero || String(formData.get("imageSrc") ?? "").trim();
    if (!imageSrc) {
      return {
        ok: false,
        error: "Add a cover photo — like Facebook or X, every post needs one.",
      };
    }

    const galleryImages = [
      ...readExistingGallery(formData),
      ...(await uploadGalleryImages(formData)),
    ].slice(0, 8);
    const published = isPublishedIntent(formData);
    const body = String(formData.get("body") ?? "");
    const title = String(formData.get("title") ?? "");
    const excerpt = String(formData.get("excerpt") ?? "");
    const lede = String(formData.get("lede") ?? "") || excerpt || body;

    const post = await createNewsPost({
      title,
      slug: String(formData.get("slug") ?? ""),
      excerpt,
      date: String(formData.get("date") ?? ""),
      category: String(formData.get("category") ?? "News") as NewsCategory,
      author: String(formData.get("author") ?? ""),
      lede,
      sourceUrl: String(formData.get("sourceUrl") ?? ""),
      body,
      imageSrc,
      imageAlt: String(formData.get("imageAlt") ?? "") || title,
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      videoEmbedUrl: String(formData.get("videoEmbedUrl") ?? ""),
      videoCaption: String(formData.get("videoCaption") ?? ""),
      published,
    });

    await recordStaffAudit({
      action: "news.create",
      module: "news",
      summary: `${published ? "Published" : "Drafted"} news post “${post.title}”`,
      targetId: post.id,
      metadata: { slug: post.slug },
    });
    revalidateNews(post.slug);
    return {
      ok: true,
      slug: post.slug,
      published,
      post,
      message: published
        ? "Released — live on /news and the article page."
        : "Draft saved. Publish when you’re ready.",
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not create post.",
    };
  }
}

export async function adminUpdateNewsPost(
  _prev: {
    ok?: boolean;
    error?: string;
    message?: string;
    slug?: string;
    published?: boolean;
    post?: ManagedNewsPost;
  } | null,
  formData: FormData,
) {
  try {
    await requireNewsEditor();
    const id = String(formData.get("id") ?? "");
    const uploadedHero = await uploadNamedImage(formData, "heroImage");
    const imageSrc =
      uploadedHero || String(formData.get("imageSrc") ?? "").trim();
    const galleryImages = [
      ...readExistingGallery(formData),
      ...(await uploadGalleryImages(formData)),
    ].slice(0, 8);
    const published = isPublishedIntent(formData);
    const body = String(formData.get("body") ?? "");
    const title = String(formData.get("title") ?? "");
    const excerpt = String(formData.get("excerpt") ?? "");
    const lede = String(formData.get("lede") ?? "") || excerpt || body;

    const post = await updateNewsPost(id, {
      title,
      slug: String(formData.get("slug") ?? ""),
      excerpt,
      date: String(formData.get("date") ?? ""),
      category: String(formData.get("category") ?? "News") as NewsCategory,
      author: String(formData.get("author") ?? ""),
      lede,
      sourceUrl: String(formData.get("sourceUrl") ?? ""),
      body,
      imageSrc: imageSrc || undefined,
      imageAlt: String(formData.get("imageAlt") ?? "") || title,
      galleryImages,
      videoEmbedUrl: String(formData.get("videoEmbedUrl") ?? ""),
      videoCaption: String(formData.get("videoCaption") ?? ""),
      published,
    });

    await recordStaffAudit({
      action: "news.update",
      module: "news",
      summary: `Updated news post “${post.title}”`,
      targetId: post.id,
      metadata: { slug: post.slug },
    });
    revalidateNews(post.slug);
    return {
      ok: true,
      slug: post.slug,
      published,
      post,
      message: published
        ? "Updated — live on /news and the article page."
        : "Draft updated.",
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not update post.",
    };
  }
}

export async function adminDeleteNewsPost(
  _prev: { ok?: boolean; error?: string; message?: string } | null,
  formData: FormData,
) {
  try {
    await requireNewsEditor();
    const id = String(formData.get("id") ?? "").trim();
    const slug = String(formData.get("slug") ?? "").trim();
    if (!id) {
      return { ok: false, error: "Missing post id." };
    }

    await deleteNewsPost(id);

    try {
      await recordStaffAudit({
        action: "news.delete",
        module: "news",
        summary: `Deleted news post ${slug || id}`,
        targetId: id,
      });
    } catch (auditError) {
      console.error("[adminDeleteNewsPost:audit]", auditError);
    }

    revalidateNews(slug || undefined);
    return {
      ok: true,
      message: slug
        ? `Removed “${slug}” from the site.`
        : "Post removed from the site.",
    };
  } catch (error) {
    console.error("[adminDeleteNewsPost]", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not remove post.",
    };
  }
}
