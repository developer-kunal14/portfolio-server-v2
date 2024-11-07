/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Admin login controller
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling admin user
 *               authentication, specifically the login process.
 *               It verifies the admin's credentials (email and password),
 *               generates a JWT token upon successful login, and handles
 *               various error scenarios with appropriate HTTP responses.
 *               The JWT token (with a 1-day expiration) is used to authenticate
 *               the admin for subsequent requests to protected resources such as
 *               the admin dashboard.
 */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authAdminUserModel from "../../models/authAdminCollection";
import envConfig from "../../config/envConfig";

class AdminUser {
  public async login(req: Request, res: Response): Promise<void> {
    const { adminUserEmail, adminUserPassword } = req.body;
    try {
      if (adminUserEmail && adminUserPassword) {
        const isAdmin = await authAdminUserModel.findOne({
          adminUserEmail,
        });
        if (!isAdmin) {
          return <any>res.status(401).json({
            issue: " Unauthorized Admin!",
            details: "You are not authorized admin.",
          });
        } else {
          const isPasswordMatch = await bcrypt.compare(
            adminUserPassword,
            isAdmin.adminUserPassword
          );
          if (isPasswordMatch === true && adminUserEmail === adminUserEmail) {
            const requestedUser = await authAdminUserModel.findOne({
              adminUserEmail,
            });
            if (requestedUser) {
              const token = jwt.sign(
                { adminId: requestedUser._id },
                envConfig.jwtSecretKey,
                { expiresIn: "1d" }
              );
              if (token) {
                return <any>res.status(200).json({
                  message: "Login successful!",
                  details: "Welcome to admin dashboard.",
                  authentication_sign: token,
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
                details: "User not exist.",
              });
            }
          } else {
            return <any>res.status(401).json({
              issue: "Authentication failed!",
              details: "Email or password dosen't match",
            });
          }
        }
      } else {
        return <any>res.status(400).json({
          issue: "Bad Request!",
          details: "Email and password required.",
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

export default new AdminUser();
