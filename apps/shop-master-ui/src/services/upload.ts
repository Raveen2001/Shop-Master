import { axiosClient } from "../utils/axios";
import { getImageBaseUrl } from "../utils/configStorage";

export interface UploadResponse {
  url: string;
  filename: string;
}

export interface UploadError {
  message: string;
  code?: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  // Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
    );
  }

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 5MB.");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosClient.post<UploadResponse>(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 second timeout for uploads
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to upload image. Please try again.");
  }
};

// Helper function to get full URL for uploaded images
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a relative path, prepend the API base URL
  const baseUrl = getImageBaseUrl();
  return `${baseUrl}${imagePath}`;
};
