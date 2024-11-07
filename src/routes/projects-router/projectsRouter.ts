/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Projects router
 * Author      : Kunal Chandra Das
 * Date        : 05.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the routes for managing projects in the
 *               system. The router defines the HTTP endpoints for creating,
 *               retrieving, updating, and deleting projects.
 *
 *               1. **GET /projects**: Retrieves a list of all projects (accessible to all users).
 *               2. **GET /projects/:id**: Retrieves a specific project by its unique ID (accessible to all users).
 *               3. **POST /projects**: Allows authenticated users (admins) to create a new project by submitting project details.
 *               4. **PATCH /projects/:id**: Allows authenticated users (admins) to update details of an existing project.
 *               5. **DELETE /projects/:id**: Allows authenticated users (admins) to delete a specific project by its ID.
 *
 *               The router ensures proper project data handling, including
 *               validation, authentication, and authorization checks where
 *               necessary (e.g., only authenticated admins can create, update, or delete projects).
 */

import { Router } from "express";
import NewProject from "../../controllers/projects/uploadNewProject";
import multerUploader from "../../middlewares/muter/multerUploader";
import AuthValidator from "../../middlewares/auth-validator/authValidator";
import ExistingProject from "../../controllers/projects/updateProject";
import RequestedProject from "../../controllers/projects/deleteProject";
import ProjectsInfo from "../../controllers/projects/getProject";

const projectsRouter = Router();
const requiredProjectImage = multerUploader.fields([
  { name: "projectLogoUrl", maxCount: 1 },
  { name: "firstPageImageUrl", maxCount: 1 },
  { name: "secondPageImageUrl", maxCount: 1 },
  { name: "thirdPageImageUrl", maxCount: 1 },
]);
//1. Upload new project route
projectsRouter.post(
  "/operation/url",
  AuthValidator.validate,
  requiredProjectImage,
  NewProject.uploadCtrl
);

//2. Update existing project route
projectsRouter.patch(
  "/operation/url/:id",
  AuthValidator.validate,
  requiredProjectImage,
  ExistingProject.updateCtrl
);

//3. Delete existing project route
projectsRouter.delete(
  "/operation/url/:id",
  AuthValidator.validate,
  RequestedProject.deleteCtrl
);

//4. get all projects route
projectsRouter.get("/operation/url", ProjectsInfo.getProjectCtrl);

//5. get single projects route
projectsRouter.get("/operation/url/:id", ProjectsInfo.getProjectCtrl);

export default projectsRouter;
