/**
 * This file contains the routes for handling resume-related
 * actions in the system. The router defines the HTTP endpoints
 * for uploading, retrieving, updating, and deleting resumes.
 *
 * 1. **GET /resumes**: Retrieves a list of all resumes uploaded
 *    to the system (accessible to all users).
 * 2. **GET /resumes/:id**: Retrieves a specific resume by its
 *    unique ID (accessible to all users).
 * 3. **POST /resumes**: Allows authenticated users to upload
 *    a new resume to the system.
 * 4. **PATCH /resumes/:id**: Allows authenticated users to
 *    update an existing resume.
 * 5. **DELETE /resumes/:id**: Allows authenticated users to
 *    delete a specific resume by its ID.
 *
 * The router ensures proper handling of resume data, including
 * validation, authentication (e.g., all write actions require authentication),
 * and authorization where necessary.
 */

import { Router } from "express";
import NewResume from "../../controllers/resume/uploadResume";
import multerUploader from "../../middlewares/muter/multerUploader";
import ExistingResume from "../../controllers/resume/updateResume";
import RequestedResume from "../../controllers/resume/deleteResume";
import ResumeInfo from "../../controllers/resume/getResume";
import AuthValidator from "../../middlewares/auth-validator/authValidator";

const resumeRouter = Router();
resumeRouter.post(
  "/kunal-chandra-das",
  AuthValidator.validate,
  multerUploader.single("resumeUrl"),
  NewResume.uploadCtrl
);

resumeRouter.put(
  "/kunal-chandra-das/:id",
  AuthValidator.validate,
  multerUploader.single("resumeUrl"),
  ExistingResume.updateCtrl
);

resumeRouter.delete(
  "/kunal-chandra-das/:id",
  AuthValidator.validate,
  RequestedResume.deleteCtrl
);

resumeRouter.get("/kunal-chandra-das/:id", ResumeInfo.getCtrl);

resumeRouter.get("/kunal-chandra-das", ResumeInfo.getCtrl);
export default resumeRouter;
