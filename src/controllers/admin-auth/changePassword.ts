/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Password change controller
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the admin user's
 *               password change functionality. It allows authenticated admins
 *               to change their password by providing a new password and confirming it.
 *
 *               The controller checks if the new password and the confirm password match.
 *               It then securely hashes the new password using bcrypt, generating a salt
 *               with a strength of 15 rounds. After hashing the password, it updates the
 *               admin's password in the database.
 *
 *               If the update is successful, a success response is returned. If any errors
 *               occur (e.g., mismatched passwords, missing fields, or database issues),
 *               appropriate error messages are returned.
 *
 *               This functionality helps admins maintain secure access by allowing
 *               them to change their password whenever necessary.
 */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authAdminUserModel from "../../models/authAdminCollection";
class Change {
  public async password(req: Request, res: Response): Promise<void> {
    const { adminUserPassword, confirmPassword } = req.body;
    try {
      if (adminUserPassword && confirmPassword) {
        if (adminUserPassword !== confirmPassword) {
          return <any>res.status(400).json({
            issue: "Bad Request!",
            details: "Password and confirm password are not same.",
          });
        } else {
          const salt = await bcrypt.genSalt(15);
          const hashedPassword = await bcrypt.hash(adminUserPassword, salt);
          const asignNewPassword = await authAdminUserModel.findByIdAndUpdate(
            req.currentUser._id,
            {
              $set: { adminUserPassword: hashedPassword },
            }
          );
          if (asignNewPassword) {
            return <any>res.status(200).json({
              details: "Password has been successfully updated.",
            });
          } else {
            return <any>res.status(501).json({
              issue: "Not Implemented!",
              details: "Something went wrong, please try again later.",
            });
          }
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
export default new Change();
