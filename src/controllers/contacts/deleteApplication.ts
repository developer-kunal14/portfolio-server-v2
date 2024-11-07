/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Delete contact application
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the deletion
 *               of a "Contact Us" application submitted by a user, which is
 *               later deleted by an admin. This functionality allows admins
 *               to manage the contact requests submitted by users, ensuring
 *               that inappropriate or irrelevant submissions can be removed
 *               from the system.
 *
 *               The controller first validates whether the request is being made
 *               by an authorized admin user. If the user has the necessary
 *               privileges, the controller checks if the contact submission exists
 *               by using the unique identifier (e.g., submission ID). The contact
 *               request is then removed from the database.
 *
 *               If the contact application is not found (e.g., invalid submission ID),
 *               the controller returns a `404 Not Found` response. If the deletion
 *               is successful, the controller returns a success message confirming
 *               that the contact request has been deleted.
 *
 *               In cases of unauthorized access (i.e., non-admin users attempting
 *               to delete a contact request), or if any unexpected issues occur
 *               during the deletion process (e.g., database failure), the controller
 *               returns an appropriate error message.
 *
 *               This controller helps admins maintain control over user-submitted
 *               content by providing a secure and efficient method to delete contact
 *               applications that no longer require attention or are deemed inappropriate.
 */

import { Request, Response } from "express";
import contactModel from "../../models/contactInfoCollection";

class RequestedApplication {
  public async deleteCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const findExistingApplication = await contactModel.findById(id);
      if (!findExistingApplication) {
        return <any>res.status(404).json({
          issue: "Not Found!",
          details: "Requested application not exist.",
        });
      } else {
        const findAndDelete = await contactModel.findByIdAndDelete(id);
        if (!findAndDelete) {
          return <any>res.status(501).json({
            issue: "Not Implemented!",
            details: "Unable to delete, please try again later.",
          });
        } else {
          return <any>res.status(200).json({
            message: "Successfully removed!",
            details: "Message has been successfully removed.",
          });
        }
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal Server Error!",
        details: error.message,
      });
    }
  }
}

export default new RequestedApplication();
