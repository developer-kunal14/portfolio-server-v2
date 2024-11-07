/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Send reset password link to email
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the handler for sending the reset password
 *               link to the admin user. It allows an admin to request a password
 *               reset by providing their registered email address.
 *
 *               The controller first validates the provided email to check if
 *               the admin exists in the system. If the email is valid, the
 *               controller generates a **password reset token** and attaches it
 *               to a reset password URL. This URL is then sent to the admin’s
 *               email address, allowing them to securely reset their password.
 *
 *               The reset token generated is time-limited (expires in 5 minutes)
 *               to ensure that the link cannot be used indefinitely. The link
 *               typically directs the admin to a page or a specific endpoint
 *               where they can enter a new password.
 *
 *               The handler also ensures that only registered admins can request
 *               a password reset, and if the email does not match any user,
 *               it returns a 500 Internal Server Error response. If any other errors occur
 *               (e.g., email sending failure), an appropriate error message is returned.
 */
import { Request, Response } from "express";
import authAdminUserModel from "../../models/authAdminCollection";
import jwt from "jsonwebtoken";
import envConfig from "../../config/envConfig";
import ResetPasswordLink from "../../utils/response-emails/reset-password/resetPasswordLink";
class ResetForgottenPassword {
  public async sendLink(req: Request, res: Response): Promise<void> {
    const { adminUserEmail } = req.body;
    const mailSender = new ResetPasswordLink();
    try {
      const findRequestedUser = await authAdminUserModel.findOne({
        adminUserEmail,
      });
      if (!findRequestedUser) {
        return <any>res.status(500).json({
          issue: "Not found!",
          details: "Requested user with this email id dose not exist.",
        });
      } else {
        const secret = findRequestedUser._id + envConfig.jwtSecretKey;
        const token = jwt.sign({ adminId: findRequestedUser._id }, secret, {
          expiresIn: "5m",
        });
        const link = `${envConfig.clientSideUrl}/reset-password/${findRequestedUser._id}/${token}`;

        await mailSender.sendMail(
          findRequestedUser.adminUserEmail,
          findRequestedUser.adminUserName,
          link,
          res
        );
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal Server error!",
        details: error.message,
      });
    }
  }
}

export default new ResetForgottenPassword();
