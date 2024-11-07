/**
 * Project Name: Kunal Chandra Das Portfolio Backend
 * Author      : Kunal Chandra Das
 * Date        : 29/10/2024
 * Version     : 2.0.0
 * Details     : This file configures the Cloudinary service for managing
 *               assets (e.g., images, videos) by setting up the necessary
 *               credentials (API key, secret, cloud name) from environment
 *               variables. It initializes and exports the Cloudinary instance
 *               for use in the project.
 */

import envConfig from "./envConfig";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: envConfig.cloudinaryCloudName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryCloudSecret,
});

const cloudinaryConfig = cloudinary;
export default cloudinaryConfig;
