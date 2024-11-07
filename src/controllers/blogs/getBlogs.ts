/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Get blog article controller
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for retrieving blog articles
 *               from the system. It supports two key functionalities: fetching
 *               all blog articles and fetching a single blog article by its
 *               unique identifier (article ID).
 *
 *               The controller has two main actions:
 *
 *               1. **Get All Blog Articles**:
 *                  The controller fetches a list of all blog articles from the
 *                  database and returns them in the response. This can be used
 *                  to display an index of articles or provide a list for the
 *                  blog homepage. The articles are typically returned in a
 *                  paginated format to prevent overwhelming the client with a
 *                  large number of articles at once.
 *
 *               2. **Get Single Blog Article**:
 *                  The controller fetches a single blog article based on the
 *                  provided article ID. It returns detailed information for the
 *                  specific article, such as the title, content, author,
 *                  publication date, and any associated tags or categories.
 *                  If the article is not found, a `404 Not Found` response is
 *                  returned.
 *
 *               In both cases, the controller ensures that the request is
 *               processed successfully, and if any errors occur (e.g., database
 *               issues, invalid article ID), an appropriate error message is
 *               returned.
 *
 *               This controller is essential for allowing users to view both
 *               individual articles and a list of all available articles on the
 *               blog platform.
 */

import { Request, Response } from "express";
import blogModel from "../../models/blogCollection";

class BlogsInfo {
  public async getCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (id) {
        const findSingleBlog = await blogModel.findById(id);
        if (!findSingleBlog) {
          return <any>res.status(404).json({
            issue: "Not Found!",
            details: "Requested blog dose not exist.",
          });
        } else {
          return <any>res.status(200).json(findSingleBlog);
        }
      } else {
        const findAllBlog = await blogModel.find();
        if (!findAllBlog) {
          return <any>res.status(404).json({
            issue: "Not Found!",
            details: "Requested blogs dose not exist.",
          });
        } else {
          return <any>res.status(200).json(findAllBlog);
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
export default new BlogsInfo();
