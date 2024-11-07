/**
 * Authenticate Admin Users Database Model
 * Project: Kunal Chandra Das Portfolio Backend
 * Author: Kunal Chandra Das
 * Date: 29/10/2024
 * Version: 2.0.0
 *
 * Description:
 * This model defines the schema and structure for the admin user document
 * in the Kunal Chandra Das Portfolio database. It is responsible for creating
 * and managing records for admin users, including fields for authentication
 * such as username, password, and roles.
 *
 * Usage:
 * Use this model to interact with admin user data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * admin user records, and includes methods for authentication and role management.
 */

import mongoose, { Schema, Document } from "mongoose";

interface IAuthentication extends Document {
  adminUserName: string;
  adminUserEmail: string;
  adminUserPassword: string;
}

const AuthAdminSchema = new Schema(
  {
    adminUserName: {
      type: String,
      required: true,
      trim: true,
    },
    adminUserEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    adminUserPassword: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const authAdminUserModel = mongoose.model<IAuthentication>(
  "admin-user",
  AuthAdminSchema
);
export default authAdminUserModel;
