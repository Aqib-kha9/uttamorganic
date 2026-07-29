import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

let configured = false;

function getCloudinary() {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured.");
  }

  if (!configured) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    configured = true;
  }

  return cloudinary;
}

export function isCloudinaryConfigured() {
  return Boolean(cloudName && apiKey && apiSecret);
}

export async function uploadImage(
  input: string,
  options?: { folder?: string; publicId?: string },
): Promise<Pick<UploadApiResponse, "asset_id" | "public_id" | "secure_url" | "resource_type" | "format" | "width" | "height">> {
  const result = await getCloudinary().uploader.upload(input, {
    folder: options?.folder || process.env.CLOUDINARY_FOLDER || "greengrow",
    public_id: options?.publicId,
    resource_type: "image",
    overwrite: Boolean(options?.publicId),
  });

  return {
    asset_id: result.asset_id,
    public_id: result.public_id,
    secure_url: result.secure_url,
    resource_type: result.resource_type,
    format: result.format,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(publicId: string) {
  return getCloudinary().uploader.destroy(publicId, { resource_type: "image" });
}

export function cloudinaryConfigError() {
  return "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.";
}
