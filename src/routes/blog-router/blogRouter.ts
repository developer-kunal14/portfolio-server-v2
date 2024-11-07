/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Blog Router
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the routes for handling blog articles
 *               in the system. The router defines the HTTP endpoints for
 *               CRUD operations on blog articles.
 *
 *               1. **GET /articles**: Retrieves a list of all blog articles.
 *
 *               2. **GET /articles/:id**: Retrieves a specific blog article
 *                  by its unique ID.
 *
 *               3. **POST /articles**: Allows the creation of a new blog article.
 *                  It also handles file uploads (e.g., image) using `multer`.
 *
 *               4. **PATCH /articles/:id**: Allows partial updates to an
 *                  existing blog article, including updating the article image.
 *
 *               5. **DELETE /articles/:id**: Deletes a specific blog article
 *                  by its ID.
 *
 *               The router uses appropriate middleware for validation,
 *               authentication, and authorization, ensuring that only
 *               authorized users can create, update, or delete articles.
 */

import { Router } from "express";
import NewBlogs from "../../controllers/blogs/uploadBlogs";
import multerUploader from "../../middlewares/muter/multerUploader";
import AuthValidator from "../../middlewares/auth-validator/authValidator";
import ExistingBlog from "../../controllers/blogs/updateBlogs";
import RequestedBlog from "../../controllers/blogs/deleteBlogs";
import BlogsInfo from "../../controllers/blogs/getBlogs";

const blogRouter = Router();

blogRouter.post(
  "/content",
  AuthValidator.validate,
  multerUploader.single("supportingImgUrl"),
  NewBlogs.uploadCtrl
);

blogRouter.patch(
  "/content/:id",
  AuthValidator.validate,
  multerUploader.single("supportingImgUrl"),
  ExistingBlog.updateCtrl
);

blogRouter.delete(
  "/content/:id",
  AuthValidator.validate,
  RequestedBlog.deleteCtrl
);

blogRouter.get("/content/:id", BlogsInfo.getCtrl);

blogRouter.get("/content", BlogsInfo.getCtrl);

export default blogRouter;
