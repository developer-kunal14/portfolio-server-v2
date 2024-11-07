/**
 * Multer File Upload Handler
 * Project: Kunal Chandra Das Portfolio Backend
 * Author: Kunal Chandra Das
 * Date: 30.10.2024
 *
 * Description:
 * This configuration file sets up Multer for handling image uploads
 * within the CBS Research Group backend. It defines the storage
 * destination, filename formatting, and file filter for image uploads.
 *
 * Usage:
 * Use this configuration in routes that require image upload functionality.
 * It handles the file storage and validation processes, ensuring that only
 * valid image files are uploaded and stored in the specified directory.
 */
import { Request } from "express";
import multer, { MulterError, FileFilterCallback } from "multer";

// Configure memory storage
const storage = multer.memoryStorage();

// Define file filter for specific file types (e.g., images and PDF)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback // Use FileFilterCallback directly
) => {
  const validMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
  ];

  if (validMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Invalid file type. Only JPEG, PNG, GIF, WEBP, SVG, and PDF files are allowed."
      )
    );
  }
};

// Create multer instance with memory storage and file filter
const multerUploader = multer({
  storage,
  fileFilter,
});

// Export the multer uploader
export default multerUploader;
