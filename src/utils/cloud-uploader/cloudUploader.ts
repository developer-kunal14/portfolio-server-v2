/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Custom image uploader (cloud)
 * Author      : Kunal Chandra Das
 * Date        : 28.10.2024
 * Version     : 2.0.0
 * Details     : This class handles uploading image files to Cloudinary, a cloud
 *               storage platform. It uses the `cloudinaryConfig.uploader.upload_stream`
 *               method to upload images and provides a streamlined API to store
 *               images in a specified folder on Cloudinary.
 *
 *               **Method: `uploadSingle`**
 *
 *               This method allows uploading a single image to Cloudinary by
 *               accepting a file buffer (e.g., an image file's binary data)
 *               and a folder name. It returns an object containing the stored
 *               image's access URL and public ID if the upload is successful.
 *
 *               The method works as follows:
 *
 *               1. **Create a Cloudinary Upload Stream**: The method creates an
 *                  upload stream using `cloudinaryConfig.uploader.upload_stream`
 *                  with options to store the image in a specific folder and to
 *                  treat the file as an image (`resource_type: "image"`).
 *
 *               2. **Buffer to Stream Conversion**: The image file, represented
 *                  by the `fileBuffer`, is converted into a readable stream
 *                  using the `streamifier.createReadStream()` method, and the
 *                  stream is piped to the Cloudinary upload stream.
 *
 *               3. **Handle Upload Response**: If the upload is successful,
 *                  the method resolves with an object containing:
 *                  - `storedDataAccessUrl`: The public URL for accessing the
 *                    uploaded image.
 *                  - `storedDataAccessId`: The unique public ID assigned to
 *                    the uploaded image by Cloudinary.
 *
 *               4. **Error Handling**: If any error occurs during the upload
 *                  process (e.g., network issues, invalid file format), the method
 *                  will log the error and reject the promise. If the upload response
 *                  is missing expected properties (URL or public ID), an error
 *                  will be thrown.
 *
 *               **Return Type**: The method returns a promise that resolves to
 *               an `UploadResult` object containing the file's URL and public ID,
 *               or `null` if the upload fails.
 *
 *               This class is useful for handling image uploads, providing a
 *               reliable interface for storing and retrieving images in Cloudinary.
 */

import cloudinaryConfig from "../../config/cloudinaryConfig";
import streamifier from "streamifier";

interface UploadResult {
  storedDataAccessUrl: string;
  storedDataAccessId: string;
}

class CloudinaryUploader {
  public async uploadSingle(
    fileBuffer: Buffer,
    folderName: string
  ): Promise<UploadResult | null> {
    try {
      return new Promise<UploadResult>((resolve, reject) => {
        const uploadStream = cloudinaryConfig.uploader.upload_stream(
          { folder: folderName, resource_type: "image" },
          (error: any, result: any) => {
            if (error) {
              reject(error);
            } else if (result && result.secure_url && result.public_id) {
              resolve({
                storedDataAccessUrl: result.secure_url,
                storedDataAccessId: result.public_id,
              });
            } else {
              reject(
                new Error("Upload result is undefined or missing properties.")
              );
            }
          }
        );

        // Create a readable stream from the buffer
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    } catch (error) {
      console.error({
        status: 500,
        issue: "Cloudinary uploader error!",
        issueOrigin: "CloudinaryUploader.uploadSingle",
        message: (error as Error).message,
      });
      return null;
    }
  }
}

export default CloudinaryUploader;
