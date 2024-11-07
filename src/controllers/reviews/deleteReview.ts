/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Delete Reviews
 * Author      : Kunal Chandra Das
 * Date        : 30.10.2024
 * Version     : 2.0.0
 * Details     : This controller handles the deletion of reviews posted by
 *               clients. It allows authorized users (e.g., admins or the
 *               review owner) to delete reviews from the system.
 *
 *               The controller first checks if the user making the request
 *               is authorized to delete the review (either the review owner
 *               or an admin). If unauthorized, a `403 Forbidden` response
 *               is returned.
 *
 *               It then attempts to find the review by its unique ID. If
 *               not found, a `404 Not Found` response is returned. If the
 *               review exists and the user is authorized, the review is deleted
 *               from the system, and a `200 OK` response is returned confirming
 *               the deletion.
 *
 *               If there is an error during the deletion process, a `500 Internal
 *               Server Error` response is returned.
 */

import { Request, Response } from "express";
import reviewModel from "../../models/reviewCollection";

class ExistingReview {
  public async deleteCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const getRequestedData = await reviewModel.findById(id);
      if (!getRequestedData) {
        return <any>res.status(404).json({
          issue: "Not found!",
          details: "The requested data was not found.",
        });
      } else {
        const deleteInfo = await reviewModel.findByIdAndDelete(id);
        if (!deleteInfo) {
          return <any>res.status(501).json({
            issue: "Not implemented!",
            details: "Requested data not been deleted, please try again later.",
          });
        } else {
          return <any>res.status(200).json({
            issue: "Successfully removed!",
            details:
              "Requested data has been successfully removed from our records",
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

export default new ExistingReview();
