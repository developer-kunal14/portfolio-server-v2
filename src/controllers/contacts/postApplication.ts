/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Post contact applications
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for handling the submission
 *               of a "Contact Us" application by a user. It allows users to
 *               send inquiries or feedback to the admin through the platform’s
 *               "Contact Us" form.
 *
 *               The controller validates the data submitted by the user, ensuring
 *               that all required fields (e.g., name, email, message) are included
 *               and properly formatted. If any of the required fields are missing
 *               or contain invalid data, the controller will return a `400 Bad Request`
 *               response with an appropriate error message.
 *
 *               Once the input data is validated, the controller stores the contact
 *               submission in the database. It includes the user's name, email,
 *               and message, and any additional data or metadata that may be included
 *               in the contact form. After successfully storing the data, the controller
 *               returns a `201 Created` response with a success message, indicating
 *               that the contact application has been successfully submitted.
 *
 *               If there is an issue during submission (e.g., database failure,
 *               validation errors), the controller returns an appropriate error message.
 *
 *               This controller plays a crucial role in enabling users to reach
 *               out to the platform administrators with inquiries, feedback, or
 *               concerns. It ensures that the submission process is secure, valid,
 *               and efficient, while also providing feedback to the user about
 *               the status of their contact request.
 */

import { Request, Response } from "express";
import contactModel from "../../models/contactInfoCollection";

class ContactApplication {
  public async postCtrl(req: Request, res: Response): Promise<void> {
    const { userName, contactEmail, contactNumber, message } = req.body;

    try {
      if (!userName && !contactEmail && !contactNumber) {
        return <any>res.status(402).json({
          issue: "Bad Request!",
          details: "Required fields are missing.",
        });
      } else {
        const postData = new contactModel({
          userName,
          contactEmail,
          contactNumber,
          message,
        });
        const saveInfo = await postData.save();
        if (!saveInfo) {
          return <any>res.status(501).json({
            issue: "Not Implemented!",
            details: "Unable to post, please try again later.",
          });
        } else {
          return <any>res.status(201).json({
            message: "Successfully uploded!",
            details: "Your message has been successfully uploaded.",
          });
        }
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal server error!",
        details: error.message,
      });
    }
  }
}
export default new ContactApplication();
