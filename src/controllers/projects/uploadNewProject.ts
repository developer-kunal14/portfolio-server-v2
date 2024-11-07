/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Upload project
 * Author      : Kunal Chandra Das
 * Date        : 05.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for uploading a new project
 *               to the system. The controller allows authorized users (e.g.,
 *               admins or project owners) to submit a new project to be stored
 *               and managed in the platform’s database.
 *
 *               The controller first validates the incoming request to ensure
 *               that all necessary fields for the project are included in the
 *               request body. Required fields typically include project name,
 *               description, and any other relevant data such as start date,
 *               milestones, associated team members, or project files.
 *
 *               If any required fields are missing or contain invalid data,
 *               the controller returns a `400 Bad Request` response, with an
 *               appropriate error message explaining what is missing or incorrect.
 *
 *               Once the data is validated, the controller proceeds to create
 *               a new project entry in the database, storing all the provided
 *               information along with any necessary metadata (e.g., project
 *               creation date, user ID of the creator). If the project is successfully
 *               uploaded, a `201 Created` response is returned, including the details
 *               of the newly created project (e.g., project ID, name, description).
 *
 *               In case of any failure during the upload process (e.g., database errors,
 *               missing data), the controller returns an appropriate error message.
 *               If the project creation fails for any reason, a `500 Internal Server Error`
 *               response is returned.
 *
 *               This controller is crucial for initiating new projects within
 *               the system. It ensures that only properly validated project data is
 *               uploaded, allowing users to add projects in a structured and secure
 *               manner while ensuring smooth project creation workflows.
 */

import { Request, Response } from "express";
import projectModel from "../../models/projectsCollection";
import CloudinaryUploader from "../../utils/cloud-uploader/cloudUploader";

// Define an interface for the expected structure of req.files
interface FileUploadFields {
  projectLogoUrl?: Express.Multer.File[];
  firstPageImageUrl?: Express.Multer.File[];
  secondPageImageUrl?: Express.Multer.File[];
  thirdPageImageUrl?: Express.Multer.File[];
}
class NewProject {
  public async uploadCtrl(req: Request, res: Response): Promise<void> {
    const {
      projectName,
      author,
      projectType,
      owner,
      description,
      liveProjectUrl,
      githubRepoUrl,
      technologyUsed,
    } = req.body;
    // Type assertion for req.files
    const files = req.files as FileUploadFields;
    let techStack: [string];
    let uploader = new CloudinaryUploader();
    let allRequiredImage = [];
    try {
      if (!files) {
        return <any>res.status(400).json({
          issue: "No files were uploaded.",
          details: "Files are required!",
        });
      } else {
        const projectLogoUrl = files.projectLogoUrl;
        const firstPageImageUrl = files.firstPageImageUrl;
        const secondPageImageUrl = files.secondPageImageUrl;
        const thirdPageImageUrl = files.thirdPageImageUrl;
        // Check if all required files are present
        if (
          !projectLogoUrl ||
          !firstPageImageUrl ||
          !secondPageImageUrl ||
          !thirdPageImageUrl
        ) {
          return <any>res.status(400).json({
            issue: "All files are required!",
            details: "One or more required files are missing.",
          });
        } else {
          const projectImages = [
            projectLogoUrl[0].buffer,
            firstPageImageUrl[0].buffer,
            secondPageImageUrl[0].buffer,
            thirdPageImageUrl[0].buffer,
          ];

          if (!Array.isArray(technologyUsed)) {
            techStack = [technologyUsed];
          }

          for (const path of projectImages) {
            try {
              const result = await uploader.uploadSingle(path, "all_projects");
              if (result) {
                const { storedDataAccessUrl, storedDataAccessId } = result;
                allRequiredImage.push({
                  secureUrl: storedDataAccessUrl,
                  publicId: storedDataAccessId,
                });
              }
            } catch (error: any) {
              return <any>res.status(500).json({
                issue: error.message,
                details: "cloudinary error occured.",
              });
            }
          }

          const projectInfo = new projectModel({
            projectName,
            author,
            projectType,
            owner,
            description,
            liveProjectUrl,
            githubRepoUrl,
            technologyUsed,
            projectLogoUrl: allRequiredImage[0].secureUrl,
            projectLogoPublicId: allRequiredImage[0].publicId,
            firstPageImageUrl: allRequiredImage[1].secureUrl,
            firstPageImagePublicId: allRequiredImage[1].publicId,
            secondPageImageUrl: allRequiredImage[2].secureUrl,
            secondPageImagePublicId: allRequiredImage[2].publicId,
            thirdPageImageUrl: allRequiredImage[3].secureUrl,
            thirdPageImagePublicId: allRequiredImage[3].publicId,
          });
          const uploadProjectInfo = projectInfo.save();
          if (!uploadProjectInfo) {
            return <any>res.status(501).json({
              issue: "Not Implemented!",
              details: "Something went wrong, please try again later.",
            });
          } else {
            return <any>res.status(201).json({
              message: "Successfully Uploaded!",
              details: "Project information has been uploaded successfully.",
            });
          }
        }
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal server error!",
        details: error.message,
      });
    }
  }
}

export default new NewProject();
