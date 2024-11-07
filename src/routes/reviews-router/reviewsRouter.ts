/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Review Router
 * Author      : Kunal Chandra Das
 * Date        : 05.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the routes for managing client reviews.
 *               The router defines the HTTP endpoints for posting, retrieving,
 *               and deleting reviews submitted by clients.
 *
 *               1. **GET /reviews/client**: Retrieves a list of all reviews
 *                  posted by clients.
 *
 *               2. **POST /reviews/client**: Allows clients to submit a new
 *                  review.
 *
 *               3. **DELETE /reviews/client/:id**: Deletes a specific review
 *                  by its ID (requires authentication).
 *
 *               The router ensures proper handling of review data, including
 *               validation, and authorization checks where necessary.
 */

import { Router } from "express";
import NewReviews from "../../controllers/reviews/uploadReview";
import ExistingReview from "../../controllers/reviews/deleteReview";
import ReviewInfo from "../../controllers/reviews/getReviews";
import AuthValidator from "../../middlewares/auth-validator/authValidator";
const reviewsRouter = Router();

reviewsRouter.post("/client", NewReviews.uploadCtrl);
reviewsRouter.delete(
  "/client/:id",
  AuthValidator.validate,
  ExistingReview.deleteCtrl
);
reviewsRouter.get("/client", ReviewInfo.getCtrl);
export default reviewsRouter;
