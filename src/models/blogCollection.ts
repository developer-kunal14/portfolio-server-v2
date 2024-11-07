/**
 * Blog Database Model
 * Project: Kunal Chandra Das Portfolio
 * Author: Kunal Chandra Das
 * Date: 29/10/2024
 * Version: 2.0.0
 *
 * Description:
 * This model defines the schema and structure for the blog document
 * in the Kunal Chandra Das Portfolio database. It is responsible for
 * creating and managing records for blog posts, including fields
 * such as title, author, images, and content.
 *
 * Usage:
 * Use this model to interact with blog data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * blog posts, and includes fields for supporting images and
 * associated code snippets.
 */

import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Blog document
interface IBlog extends Document {
  blogTitle: string;
  authorName: string;
  supportingImgUrl: string;
  supportingImgPublicId: string;
  statementHeading: string;
  statement: string;
  corespondingCode?: string;
  commandLine?: string;
  status?: boolean;
}

// Create the Blog schema
const BlogSchema: Schema = new Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      maxlength: 50,
      required: true,
    },
    supportingImgUrl: {
      type: String,
      required: true,
    },
    supportingImgPublicId: {
      type: String,
      required: true,
    },
    statementHeading: {
      type: String,
      required: true,
    },
    statement: {
      type: String,
      required: true,
    },
    corespondingCode: {
      type: String,
    },
    commandLine: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true, // Changed from 1 to true for better clarity
    },
  },
  { timestamps: true }
);

// Create the model
const blogModel = mongoose.model<IBlog>("Blog", BlogSchema);

export default blogModel;
