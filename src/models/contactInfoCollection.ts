/**
 * Contact Us Database Model
 * Project: Kunal Chandra Das Portfolio
 * Author: Kunal Chandra Das
 * Date: 29/10/2024
 * Version: 2.0.0
 *
 * Description:
 * This model defines the schema and structure for the contact us document
 * in the Kunal Chandra Das Portfolio database. It is responsible for
 * managing records of user inquiries, including fields for name, email,
 * message, and submission date.
 *
 * Usage:
 * Use this model to interact with contact form data in the database.
 * It supports operations like creating and reading inquiries, allowing
 * for effective communication management with users who reach out for
 * support, feedback, or inquiries.
 */

import mongoose, { Document, Schema } from "mongoose";

interface IContact extends Document {
  userName: string;
  contactEmail: string;
  contactNumber?: string;
  message: string;
  status?: boolean;
}
const validatePhoneNumber = function (phone: string) {
  return /^\d{10}$/.test(phone); // Ensures the phone number is exactly 10 digits
};
const ContactSchema = new Schema(
  {
    userName: {
      type: String,
      length: 50,
      required: true,
    },
    contactEmail: {
      type: String,
      length: 50,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: validatePhoneNumber,
        message: "Phone number must be exactly 10 digits.",
      },
    },
    message: {
      type: String,
      length: 1500,
      required: true,
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

const contactModel = mongoose.model<IContact>(
  "Contact-application",
  ContactSchema
);
export default contactModel;
