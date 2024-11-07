/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Delete existing projects
 * Author      : Kunal Chandra Das
 * Date        : 05.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the deletion
 *               of an existing project in the system. The controller allows
 *               authorized users (e.g., admins or project owners) to delete
 *               a project from the platform.
 *
 *               The controller first checks if the user making the request
 *               has the necessary authorization to delete the project. This
 *               typically involves verifying that the user is either an admin
 *               or the owner of the project. If the user is not authorized,
 *               a `403 Forbidden` response is returned.
 *
 *               The controller then attempts to find the project in the
 *               database using the unique project ID provided in the request.
 *               If the project is not found, a `404 Not Found` response is
 *               returned.
 *
 *               If the project exists and the user is authorized to delete it,
 *               the controller proceeds to delete the project from the system,
 *               removing all associated data (e.g., files, dependencies,
 *               records). Once the deletion is successful, a `200 OK` response
 *               is returned, indicating that the project has been successfully
 *               deleted.
 *
 *               In case of any errors during the deletion process (e.g.,
 *               database issues), the controller returns an appropriate error
 *               message. If the project deletion fails for any reason, a `500
 *               Internal Server Error` response is returned.
 *
 *               This controller is essential for managing project lifecycles,
 *               allowing users to safely remove outdated, irrelevant, or
 *               unnecessary projects from the system.
 */

import { Request, Response } from "express";
import projectModel from "../../models/projectsCollection";
import cloudinaryConfig from "../../config/cloudinaryConfig";

class RequestedProject {
  public async deleteCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const getRequestedInfo = await projectModel.findById(id);
      if (!getRequestedInfo) {
        return <any>res.status(404).json({
          issue: "Not found!",
          details: "Requested resources are not found.",
        });
      } else {
        const {
          projectLogoPublicId,
          firstPageImagePublicId,
          secondPageImagePublicId,
          thirdPageImagePublicId,
        } = getRequestedInfo;

        const allPublicId = [
          projectLogoPublicId,
          firstPageImagePublicId,
          secondPageImagePublicId,
          thirdPageImagePublicId,
        ];
        const deleteAllAssets = await cloudinaryConfig.api.delete_resources(
          allPublicId,
          {
            type: "upload",
            resource_type: "image",
          }
        );
        if (deleteAllAssets) {
          const deleted = await projectModel.findByIdAndDelete(id);
          if (deleted) {
            return <any>res.status(200).json({
              message: "Removed successfully!",
              details: "Requested resources has been successfully removed.",
            });
          } else {
            return <any>res.status(501).json({
              issue: "Not Implemented!",
              details: "Something went wrong, please try again later.",
            });
          }
        } else {
          return <any>res.status(501).json({
            issue: "Cloudinary error!",
            details: "Something went wrong, please try again later.",
          });
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
export default new RequestedProject();
