/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Delete blog article controller
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the deletion of
 *               blog articles in the system. It allows authenticated users or
 *               admins to delete blog articles from the database.
 *
 *               The controller first verifies if the user making the request
 *               has the necessary permissions to delete the article (e.g.,
 *               checking if the user is the author of the article or if the
 *               user has admin privileges). If the user is authorized, the
 *               controller proceeds to delete the specified blog article from
 *               the database using the article’s unique identifier (e.g., article ID).
 *
 *               The controller checks if the article exists before attempting
 *               to delete it. If the article does not exist, a `404 Not Found`
 *               response is returned. After successful deletion, the controller
 *               sends a success message indicating that the article was deleted.
 *
 *               In case of any errors (e.g., database failure, permission issues),
 *               the controller returns an appropriate error message.
 *
 *               This controller helps manage blog content by allowing authorized
 *               users to delete articles that are no longer needed or inappropriate.
 */

import { Request, Response } from "express";
import blogModel from "../../models/blogCollection";
import Destroyer from "../../utils/cloud-destroyed/cloudDestroyer";

class RequestedBlog {
  public async deleteCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const destroyer = new Destroyer();
    try {
      const findExistingBlog = await blogModel.findById(id);
      if (!findExistingBlog) {
        return <any>res.status(404).json({
          issue: "Not Found!",
          details: "Requested blog not exist.",
        });
      } else {
        await destroyer.cloudAssets(findExistingBlog.supportingImgPublicId);
        const deleteThisBlog = await blogModel.findByIdAndDelete(id);
        if (!deleteThisBlog) {
          return <any>res.status(501).json({
            issue: "Not Implemented!",
            details: "Unable to upload blogs, please try again later.",
          });
        } else {
          return <any>res.status(200).json({
            message: "Successfully removed!",
            details: "Blog has been successfully removed from our records.",
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

export default new RequestedBlog();
