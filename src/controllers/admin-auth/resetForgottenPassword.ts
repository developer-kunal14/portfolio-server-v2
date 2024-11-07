/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Reset forgotten password
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the password reset
 *               process for admin users. It allows admins to reset their password
 *               by providing a valid ID and reset token.
 *
 *               The controller first checks if the admin user exists in the system by their ID.
 *               If the user exists, it verifies the provided reset token included in the request.
 *               The token is time-limited and used to ensure secure password resetting.
 *
 *               Once the token is verified, the new password is securely hashed using **bcrypt**
 *               before being stored in the database.
 *
 *               If the provided reset token is invalid or expired, or if there are issues with
 *               updating the password, appropriate error messages are returned.
 *
 *               This controller helps admins recover access to their accounts
 *               securely by providing a mechanism for resetting their forgotten
 *               or compromised passwords.
 */

import { Request, Response } from "express";
import authAdminUserModel from "../../models/authAdminCollection";
import envConfig from "../../config/envConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class ForgottenPassword {
  public async resetPassword(req: Request, res: Response): Promise<void> {
    const { adminUserPassword, confirmPassword } = req.body;
    const { id, token } = req.params;
    try {
      if (adminUserPassword && confirmPassword) {
        if (adminUserPassword === confirmPassword) {
          const findexistingUser = await authAdminUserModel.findById(id);
          if (!findexistingUser) {
            return <any>res.status(404).json({
              issue: "Not found!",
              details: "Requested user dose not exist in our records.",
            });
          } else {
            const newSecret = findexistingUser._id + envConfig.jwtSecretKey;
            jwt.verify(token, newSecret);
            const salt = await bcrypt.genSalt(15);
            const hashPassword = await bcrypt.hash(adminUserPassword, salt);
            const findExistingOneAndUpdate =
              await authAdminUserModel.findByIdAndUpdate(findexistingUser._id, {
                $set: { adminUserPassword: hashPassword },
              });
            if (!findExistingOneAndUpdate) {
              return <any>res.status(501).json({
                issue: "Not Implemented!",
                details: "Something went wrong, please try again later.",
              });
            } else {
              return <any>res.status(200).json({
                issue: "Successfully Reset!",
                details: "Your password has been updated.",
              });
            }
          }
        } else {
          return <any>res.status(403).json({
            issue: "Forbidden!.",
            details: "Password and confirm password not match",
          });
        }
      } else {
        return <any>res.status(400).json({
          issue: "Bad Request!",
          details: "All fields are required.",
        });
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal Server Error!",
        details: error.message,
      });
    }
  }
}
export default new ForgottenPassword();
