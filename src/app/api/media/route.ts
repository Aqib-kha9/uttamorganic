import { NextResponse } from "next/server";
import { handleApiError, jsonError, parseJsonBody, requireAdmin } from "@/lib/server/api";
import {
  cloudinaryConfigError,
  deleteImage,
  isCloudinaryConfigured,
} from "@/lib/server/cloudinary";

export const runtime = "nodejs";

export async function DELETE(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isCloudinaryConfigured()) return jsonError(cloudinaryConfigError(), 503);

  try {
    const body = await parseJsonBody(request);
    if (typeof body.publicId !== "string" || !body.publicId) {
      return jsonError("Cloudinary publicId is required.");
    }

    const result = await deleteImage(body.publicId);
    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof SyntaxError) return jsonError("Request body must be valid JSON.");
    return handleApiError(error);
  }
}
