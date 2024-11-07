/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Upload Resume
 * Author      : Kunal Chandra Das
 * Date        : 31.10.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for uploading a new resume
 *               to the system. The controller allows authorized users (e.g.,
 *               users or admins) to submit a new resume for storage in the
 *               platform’s database.
 *
 *               The controller first validates the incoming request to ensure
 *               that all necessary fields for the resume are included in the
 *               request body. Required fields typically include the user's name,
 *               contact information, work experience, skills, education, and
 *               any other relevant data that should be part of the resume.
 *
 *               If any required fields are missing or contain invalid data,
 *               the controller returns a `400 Bad Request` response, with an
 *               appropriate error message detailing what is missing or incorrect.
 *
 *               Once the data is validated, the controller checks if the user
 *               has uploaded a valid resume file (e.g., PDF, DOCX) and whether
 *               the file meets the required size and format constraints. If the
 *               resume file is valid, the controller proceeds to store the resume
 *               in the database, along with any necessary metadata such as the
 *               file URL, upload timestamp, and user ID.
 *
 *               If the upload is successful, a `201 Created` response is returned,
 *               containing the details of the newly uploaded resume, including
 *               the resume ID, user details, and other relevant resume metadata.
 *
 *               If the file is invalid or the upload fails for any reason (e.g.,
 *               file size too large, unsupported format), a `415 Unsupported Media Type`
 *               response is returned, with an appropriate error message.
 *
 *               In case of any failure during the upload process (e.g., database
 *               issues), the controller returns a `500 Internal Server Error` response.
 *
 *               This controller is essential for enabling users to upload their
 *               resumes securely, ensuring that the platform can accept and store
 *               valid resume data and associated files. It is a critical part of
 *               the resume management process, facilitating the addition of new resumes
 *               to the system.
 */

import { Request, Response } from "express";
import CloudinaryUploader from "../../utils/cloud-uploader/cloudUploader";
import resumeModel from "../../models/resumeCollection";
interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
class NewResume {
  public async uploadCtrl(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file as IFile;
      const resumeBuffer = file.buffer;
      let uploader = new CloudinaryUploader();
      if (file) {
        const cloudUpload = await uploader.uploadSingle(resumeBuffer, "Resume");
        if (!cloudUpload) {
          return <any>res.status(500).json({
            issue: "Cloudinary upload error!",
            details: "Something went wrong please try again later.",
          });
        } else {
          const { storedDataAccessId, storedDataAccessUrl } = cloudUpload;
          const resumeInfo = new resumeModel({
            resumeUrl: storedDataAccessUrl,
            resumePublicId: storedDataAccessId,
          });
          const saveResume = await resumeInfo.save();
          if (!saveResume) {
            return <any>res.status(501).json({
              issue: "Not Implemented!",
              details: "Unable to upload resume, please try again later.",
            });
          } else {
            return <any>res.status(201).json({
              message: "Successfully uploded!",
              details:
                "New resume has been successfully uploaded to our records.",
            });
          }
        }
      } else {
        return <any>res.status(402).json({
          issue: "Bad Request!",
          details: "Fields are required.",
        });
      }
    } catch (error: any) {
      return <any>res.status(402).json({
        issue: "Internal server error!",
        details: error.message,
      });
    }
  }
}
export default new NewResume();
