import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function safeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

/**
 * Store a public image for CMS use (employee/staff photos, news media).
 * Uses Vercel Blob in production; falls back to /public/uploads locally.
 */
export async function storePublicImage(input: {
  folder: string;
  fileName: string;
  contentType: string;
  bytes: Buffer;
}): Promise<{ url: string; storageKey: string }> {
  const folder = input.folder.replace(/^\/+|\/+$/g, "");
  const name = `${Date.now()}-${safeFileName(input.fileName)}`;
  const key = `${folder}/${name}`;

  if (useBlob()) {
    const blob = await put(key, input.bytes, {
      access: "public",
      contentType: input.contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return { url: blob.url, storageKey: key };
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), input.bytes);
  return { url: `/uploads/${folder}/${name}`, storageKey: key };
}

export async function readImageFile(
  formData: FormData,
  fieldName: string,
): Promise<{ bytes: Buffer; fileName: string; contentType: string } | null> {
  const value = formData.get(fieldName);
  if (!(value instanceof File) || value.size === 0) return null;
  if (!value.type.startsWith("image/")) {
    throw new Error("Please upload an image file (JPEG, PNG, or WebP).");
  }
  if (value.size > 8 * 1024 * 1024) {
    throw new Error("Image must be 8 MB or smaller.");
  }
  const bytes = Buffer.from(await value.arrayBuffer());
  return {
    bytes,
    fileName: value.name || "photo.jpg",
    contentType: value.type || "image/jpeg",
  };
}
