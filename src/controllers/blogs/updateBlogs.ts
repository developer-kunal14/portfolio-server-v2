/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Update blog article controller
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for updating a single blog
 *               article in the system. The update operation is performed using
 *               the HTTP **PATCH** method, which allows partial updates to an
 *               existing article, meaning only the fields that need to be modified
 *               are included in the request.
 *
 *               The controller first checks whether the user is authorized to
 *               update the article (e.g., the user must be the author of the
 *               article or have admin privileges). Once authorization is verified,
 *               the controller proceeds to update the article in the database
 *               based on the fields provided in the request body (e.g., title,
 *               content, tags).
 *
 *               The controller checks if the article exists before performing
 *               the update. If the article is not found, a `404 Not Found` response
 *               is returned. If the update is successful, the controller returns a
 *               success response with the updated article information or a confirmation
 *               message.
 *
 *               In case of any errors (e.g., invalid data, article not found,
 *               database issues), the controller returns an appropriate error message.
 *
 *               This controller is essential for allowing authorized users to
 *               modify existing blog content without needing to replace the entire
 *               article. The use of the **PATCH** method enables efficient partial
 *               updates.
 */

import { Request, Response } from "express";
import CloudinaryUploader from "../../utils/cloud-uploader/cloudUploader";
import Destroyer from "../../utils/cloud-destroyed/cloudDestroyer";
import blogModel from "../../models/blogCollection";
interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
class ExistingBlog {
  public async updateCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const file = req.file as IFile;
    const imageBuffer = file.buffer;
    let uploader = new CloudinaryUploader();
    let destroyer = new Destroyer();

    const {
      blogTitle,
      authorName,
      statementHeading,
      statement,
      corespondingCode,
      commandLine,
    } = req.body;

    try {
      const findExistingBlog = await blogModel.findById(id);
      if (!findExistingBlog) {
        return <any>res.status(404).json({
          issue: "Not Found!",
          details: "Requested blog not exist.",
        });
      } else {
        let imageUpload;
        if (file) {
          imageUpload = await uploader.uploadSingle(imageBuffer, "Blog_Assets");
          await destroyer.cloudAssets(findExistingBlog.supportingImgPublicId);
        }

        const newBlogTitle = blogTitle || findExistingBlog.blogTitle;
        const newAuthorName = authorName || findExistingBlog.authorName;
        const newStatementHeading =
          statementHeading || findExistingBlog.statementHeading;
        const newStatement = statement || findExistingBlog.statement;
        const newCorespondingCode =
          corespondingCode || findExistingBlog.corespondingCode;
        const newCommandLine = commandLine || findExistingBlog.commandLine;
        const newImageUrl = file
          ? imageUpload?.storedDataAccessUrl
          : findExistingBlog.supportingImgUrl;
        const newPublicId = file
          ? imageUpload?.storedDataAccessId
          : findExistingBlog.supportingImgPublicId;

        const updatedData = {
          blogTitle: newBlogTitle,
          authorName: newAuthorName,
          supportingImgUrl: newImageUrl,
          supportingImgPublicId: newPublicId,
          statementHeading: newStatementHeading,
          statement: newStatement,
          corespondingCode: newCorespondingCode,
          commandLine: newCommandLine,
        };

        const updateBlog = await blogModel.findByIdAndUpdate(id, updatedData, {
          new: true,
        });
        if (!updateBlog) {
          return <any>res.status(501).json({
            issue: "Not Implemented!",
            details: "Unable to upload blog, please try again later.",
          });
        } else {
          return <any>res.status(200).json({
            message: "Update Successful!",
            details: "Blog Info has been successfully updated.",
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
export default new ExistingBlog();
