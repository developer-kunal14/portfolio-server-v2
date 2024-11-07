/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Validate user authentication
 * Author      : Kunal Chandra Das
 * Date        : 01.11.2024
 * Version     : 2.0.0
 * Details     : This middleware handles the authentication validation for
 *               protected routes. It checks the validity of the JWT token
 *               provided in the request header.
 *
 *               The middleware first extracts the token from the `Authorization`
 *               header. If the token is missing or invalid, it returns a `401 Unauthorized`
 *               response, indicating that the user is not authenticated.
 *
 *               If the token is valid, the middleware decodes the token and adds
 *               the user’s information (e.g., user ID) to the request object, allowing
 *               the next middleware or route handler to access it.
 *
 *               In case of any issues with decoding or verification, a `403 Forbidden`
 *               response is returned, signaling that the user does not have access.
 */

import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../../config/envConfig";
import authAdminUserModel from "../../models/authAdminCollection";

interface DecodedToken {
  adminId: string;
  // Add other properties if your token has them
}
declare module "express-serve-static-core" {
  interface Request {
    currentUser?: any;
  }
}

class AuthValidator {
  public async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = req.headers;

    if (
      authorization &&
      typeof authorization === "string" &&
      authorization.startsWith("Bearer ")
    ) {
      const token = authorization.split(" ")[1];

      try {
        // Type assertion for decoded token
        const decoded = jwt.verify(
          token,
          envConfig.jwtSecretKey
        ) as DecodedToken;

        // Now you can safely access adminId
        const user = await authAdminUserModel
          .findById(decoded.adminId)
          .select("-adminUserPassword");

        if (!user) {
          return <any>(
            res
              .status(404)
              .json({ issue: "Not Found", details: "Admin user not found." })
          );
        } else {
          req.currentUser = user;
          next();
        }
      } catch (error: any) {
        return <any>(
          res
            .status(401)
            .json({ issue: "Unauthorized!", details: error.message })
        );
      }
    } else {
      return <any>res.status(400).json({
        issue: "Bad Request",
        details: "Authorization header is required.",
      });
    }
  }
}

export default new AuthValidator();
