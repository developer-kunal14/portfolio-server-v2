/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Get current admin user
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for retrieving information
 *               about the currently logged-in admin user. It fetches the
 *               admin user's details from the database based on the
 *               authenticated session or JWT token provided in the request
 *               header.
 *
 *               The controller assumes that the JWT token has been validated
 *               in a previous middleware, and the admin user's details are
 *               available in `req.currentUser`. If `req.currentUser` exists,
 *               it retrieves the user's details and returns them in the response.
 *
 *               If the `req.currentUser` is not found (e.g., if the JWT token
 *               was invalid or expired), the controller returns a `400 Bad Request`
 *               error. This error might indicate that the request is malformed
 *               or the user is not authenticated.
 *
 *               This controller allows the system to return personalized
 *               information about the currently authenticated admin user,
 *               such as their name, email, and role.
 */

import { Request, Response } from "express";
class LoggedIn {
  public async currentUser(req: Request, res: Response): Promise<void> {
    try {
      if (req.currentUser) {
        return <any>res.status(200).json({
          userDetails: req.currentUser,
        });
      } else {
        return <any>res.status(400).json({
          issue: "Bad Request!",
          details: "Request are not valid.",
        });
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: error.message,
        details:
          "Unable to perform this operation due to some technical problem",
      });
    }
  }
}
export default new LoggedIn();
