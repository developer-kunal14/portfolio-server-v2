/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Get all reviews
 * Author      : Kunal Chandra Das
 * Date        : 30.10.2024
 * Version     : 2.0.0
 * Details     : This controller handles fetching reviews posted by clients.
 **/

import { Request, Response } from "express";
import reviewModel from "../../models/reviewCollection";

class ReviewInfo {
  public async getCtrl(req: Request, res: Response): Promise<void> {
    try {
      const findAllReviews = await reviewModel.find();
      if (!findAllReviews) {
        return <any>res.status(404).json({
          issue: "Not Found!",
          details: "Requested resources are not found.",
        });
      } else {
        return <any>res.status(200).json(findAllReviews);
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal server error!",
        details: error.message,
      });
    }
  }
}
export default new ReviewInfo();
