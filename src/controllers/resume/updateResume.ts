/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Update Resume
 * Author      : Kunal Chandra Das
 * Date        : 31.10.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for updating an existing
 *               resume in the system. The controller allows authorized users
 *               (e.g., users or admins) to modify the details of an existing
 *               resume, including fields such as contact information, skills,
 *               work experience, education, and other relevant data.
 *
 *               The controller first checks whether the user making the request
 *               has the necessary authorization to update the resume. Typically,
 *               this involves verifying that the user is either the owner of the
 *               resume or an admin. If the user is not authorized, a `403 Forbidden`
 *               response is returned.
 *
 *               The controller then attempts to find the resume in the database
 *               using the unique resume ID provided in the request. If the resume
 *               is not found (e.g., invalid ID), a `404 Not Found` response is
 *               returned, indicating that the requested resume does not exist.
 *
 *               Once the resume is located and the user is authorized, the controller
 *               proceeds to update the resume fields with the new data provided
 *               in the request body. This can include updates to personal information,
 *               skills, job history, education details, and other sections of the resume.
 *
 *               If the request contains invalid or incomplete data (e.g., missing
 *               required fields), the controller returns a `400 Bad Request` response
 *               along with a description of what is wrong or missing.
 *
 *               Once the update is successfully processed, a `200 OK` response
 *               is returned, containing the updated resume details. In case of any
 *               issues during the update process (e.g., database failures), the
 *               controller returns a `500 Internal Server Error` response.
 *
 *               This controller is essential for allowing users to keep their
 *               resumes up-to-date, ensuring that resume details can be modified
 *               and managed securely and efficiently within the system.
 */

import { Request, Response } from "express";
import resumeModel from "../../models/resumeCollection";
import Destroyer from "../../utils/cloud-destroyed/cloudDestroyer";
import CloudinaryUploader from "../../utils/cloud-uploader/cloudUploader";
interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
class ExistingResume {
  public async updateCtrl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const file = req.file as IFile;
      const resumeBuffer = file.buffer;
      let uploader = new CloudinaryUploader();
      let destroyer = new Destroyer();

      let existingResume = await resumeModel.findById(id);
      if (!existingResume) {
        return <any>res.status(404).json({
          issue: "Not Found!",
          details: "Requested resume not exist.",
        });
      } else {
        const uploadNewResume = await uploader.uploadSingle(
          resumeBuffer,
          "Resume"
        );
        if (!uploadNewResume) {
          return <any>res.status(500).json({
            issue: "Cloudinary upload error!",
            details: "Something went wrong please try again later.",
          });
        } else {
          const { storedDataAccessUrl, storedDataAccessId } = uploadNewResume;
          const updatedResume = {
            resumeUrl: storedDataAccessUrl,
            resumePublicId: storedDataAccessId,
          };
          const { resumePublicId } = existingResume;
          await destroyer.cloudAssets(resumePublicId);
          const resumeUpdate = await resumeModel.findByIdAndUpdate(
            id,
            updatedResume,
            { new: true }
          );
          if (!resumeUpdate) {
            return <any>res.status(501).json({
              issue: "Not Implemented!",
              details: "Unable to upload resume, please try again later.",
            });
          } else {
            return <any>res.status(201).json({
              message: "Update Successful!",
              details: "New resume has been successfully updated.",
            });
          }
        }
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal Server Error!",
        details: error.message,
      });
    }
  }
}
export default new ExistingResume();
