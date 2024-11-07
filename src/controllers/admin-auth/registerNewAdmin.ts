/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Register new admin
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the registration
 *               of a new admin user. It allows the creation of an admin account
 *               by accepting the admin's details (such as name, email, and password)
 *               from the client.
 *
 *               The controller first validates the input data to ensure all required
 *               fields (e.g., name, email, and password) are provided. It checks if the
 *               provided email or username is already in use in the system, and if it is,
 *               it returns a `409 Conflict` response. If the email or username is unique, the
 *               password is hashed using **bcrypt** before storing it securely in the database.
 *
 *               After successfully registering the admin, the controller returns
 *               a success response with a message confirming the new admin account
 *               creation. If there are any validation errors or unexpected issues
 *               (e.g., database failure), the controller will respond with an
 *               appropriate error message.
 *
 *               This controller helps system administrators securely create
 *               new admin accounts and manage access control to the system.
 */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../../config/envConfig";
import authAdminUserModel from "../../models/authAdminCollection";

class NewAdmin {
  public async register(req: Request, res: Response): Promise<void> {
    const {
      adminUserName,
      adminUserEmail,
      adminUserPassword,
      confirmPassword,
    } = req.body;

    try {
      // Check is users email already exist or not
      const requestedUserId = await authAdminUserModel.findOne({
        adminUserName,
      });
      // If user exist the run this block of code
      if (requestedUserId) {
        res.status(409).json({
          issue: "Confilct!",
          details: "Requested user with this email id already exists.",
        });
        // If not exist run this block of code
      } else {
        if (
          adminUserName &&
          adminUserEmail &&
          adminUserPassword &&
          confirmPassword
        ) {
          if (adminUserPassword === confirmPassword) {
            // Encrypt given adminUserPassword
            const salt = await bcrypt.genSalt(15);
            const hashPassword = await bcrypt.hash(adminUserPassword, salt);
            const newAdminUser = new authAdminUserModel({
              adminUserName: adminUserName,
              adminUserEmail: adminUserEmail,
              adminUserPassword: hashPassword,
            });
            const userApplication = await newAdminUser.save();
            if (!userApplication) {
              return <any>res.status(501).json({
                issue: "Not implemented!",
                details: "Something went wrong, please try again later.",
              });
            } else {
              const recentUser = await authAdminUserModel.findOne({
                adminUserName,
              });
              if (recentUser) {
                const token = jwt.sign(
                  { adminId: recentUser._id },
                  envConfig.jwtSecretKey,
                  {
                    expiresIn: "1d",
                  }
                );
                if (token) {
                  return <any>res.status(201).json({
                    message: "Registration successful!",
                    details: "Congratulations!",
                    valid_admin_token: token,
                  });
                } else {
                  return <any>res.status(501).json({
                    issue: "Not implemented!",
                    details: "Something went wrong please try again later.",
                  });
                }
              } else {
                return <any>res.status(404).json({
                  issue: "Not found!",
                  details: "Requested user id not found.",
                });
              }
            }
          } else {
            return <any>res.status(400).json({
              issue: "Bad Request!",
              details: "Password and confirm adminUserPassword are not same.",
            });
          }
        } else {
          return <any>res.status(400).json({
            issue: "Bad Request!",
            details: "All fields are required.",
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

export default new NewAdmin();
