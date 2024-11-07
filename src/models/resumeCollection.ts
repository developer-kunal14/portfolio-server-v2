/**
 * Resume Database Model
 * Project: Kunal Chandra Das Portfolio
 * Author: Kunal Chandra Das
 * Date: 29/10/2024
 * Version: 2.0.0
 *
 * Description:
 * This model defines the schema and structure for the resume document
 * in the Kunal Chandra Das Portfolio database. It is responsible for
 * creating and managing records related to the user's professional
 * experience, education, skills, and certifications.
 *
 * Usage:
 * Use this model to interact with resume data in the database.
 * It supports operations like creating, reading, updating, and deleting
 * resume entries, enabling effective management of career information
 * and showcasing qualifications to potential employers.
 */

import mongoose, { Document, Schema } from "mongoose";
interface IResume extends Document {
  resumeUrl: string;
  resumePublicId: string;
  status?: boolean;
}
const ResumeSchema = new Schema(
  {
    resumeUrl: {
      type: String,
      required: true,
    },
    resumePublicId: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

const resumeModel = mongoose.model<IResume>("resume", ResumeSchema);

export default resumeModel;
