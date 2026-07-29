import { NextResponse } from "next/server";
import { handleApiError, jsonError, requireAdmin } from "@/lib/server/api";
import {
  cloudinaryConfigError,
  isCloudinaryConfigured,
  uploadImage,
} from "@/lib/server/cloudinary";

export const runtime = "nodejs";

const maxUploadBytes = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isCloudinaryConfigured()) return jsonError(cloudinaryConfigError(), 503);

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");
    const publicId = formData.get("publicId");

    if (!(file instanceof File)) return jsonError("An image file is required.");
    if (!file.type.startsWith("image/")) return jsonError("Only image files are accepted.");
    if (file.size > maxUploadBytes) return jsonError("Image size cannot exceed 10 MB.", 413);

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result = await uploadImage(dataUri, {
      folder: typeof folder === "string" && folder ? folder : undefined,
      publicId: typeof publicId === "string" && publicId ? publicId : undefined,
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
