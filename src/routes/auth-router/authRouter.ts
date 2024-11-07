/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Authentication Router
 * Author      : Kunal Chandra Das
 * Date        : 28.10.2024
 * Version     : 2.0.0
 * Details     : This file contains the routes for handling admin authentication
 *               in the system. The router defines the HTTP endpoints for admin
 *               login, authentication, and token management.
 *
 *               1. **POST /admin/login**: Authenticates an admin user by
 *                  validating the provided email and password, and returns
 *                  a JWT token if the credentials are correct.
 *
 *               2. **POST /admin/reset-password-link**: Sends a password
 *                  reset link to the admin's email address, allowing them
 *                  to reset their password securely.
 *
 *               The router ensures secure admin access by using appropriate
 *               authentication middleware and returning relevant error messages
 *               for invalid credentials or unauthorized access.
 */

import { Router } from "express";
import AuthValidator from "../../middlewares/auth-validator/authValidator";
import LoggedIn from "../../controllers/admin-auth/loggedInUser";
import Change from "../../controllers/admin-auth/changePassword";
import NewAdmin from "../../controllers/admin-auth/registerNewAdmin";
import AdminUser from "../../controllers/admin-auth/adminLogin";
import ResetForgottenPassword from "../../controllers/admin-auth/resetPasswordLink";
import ForgottenPassword from "../../controllers/admin-auth/resetForgottenPassword";

const admiAuthenticationRouter = Router();

// Register As An Admin
admiAuthenticationRouter.post("/register", NewAdmin.register);

// Login As An Admin
admiAuthenticationRouter.post("/login", AdminUser.login);

// Get Current Admin User
admiAuthenticationRouter.get(
  "/current-user",
  AuthValidator.validate,
  LoggedIn.currentUser
);

// Change Password
admiAuthenticationRouter.put(
  "/change-password",
  AuthValidator.validate,
  Change.password
);

// Reset password link send
admiAuthenticationRouter.post(
  "/reset-password-link",
  ResetForgottenPassword.sendLink
);

// Reset password
admiAuthenticationRouter.put(
  "/reset-password/:id/:token",
  ForgottenPassword.resetPassword
);

export default admiAuthenticationRouter;
