/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Send response to user who contact me
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for sending a response to
 *               a user's "Contact Us" inquiry. The controller allows the admin
 *               to respond to a contact request submitted by the user, typically
 *               addressing the inquiry, providing support, or acknowledging the
 *               feedback.
 *
 *               The controller first validates that the admin is authorized to
 *               respond to the inquiry. Once the admin is authenticated, the
 *               controller fetches the original contact application from the
 *               database using the unique submission ID or identifier.
 *
 *               The controller then checks if the contact inquiry exists. If the
 *               inquiry does not exist or has already been deleted, a `404 Not
 *               Found` response is returned. If the inquiry exists, the controller
 *               allows the admin to send a response, typically via email or through
 *               the system’s messaging interface, depending on the system’s design.
 *
 *               The response message from the admin is then stored or sent to the
 *               user, and a confirmation of the successful response is returned to
 *               the admin (e.g., a `200 OK` status with a success message).
 *               The controller also handles edge cases, such as errors in sending
 *               the response (e.g., email failure, database issues) by returning
 *               appropriate error messages.
 *
 *               This controller is critical for facilitating communication
 *               between the platform's admins and users, enabling timely
 *               responses to inquiries, feedback, or support requests submitted
 *               through the "Contact Us" form.
 */

import { Request, Response } from "express";
import contactModel from "../../models/contactInfoCollection";
import ContactResponse from "../../utils/response-emails/contact-response/contactResponse";

class SendContactRes {
  public async sendEmail(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { subject, emailBody } = req.body;
    const emailSender = new ContactResponse();
    try {
      const getContactApplication = await contactModel.findById(id);
      if (!getContactApplication) {
        return <any>res.status(404).json({
          issue: "Not found!",
          details: "Requested resources are not found.",
        });
      } else {
        const { contactEmail, userName } = getContactApplication;
        await emailSender.sendemail(
          contactEmail,
          userName,
          subject,
          emailBody,
          res
        );
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: error.message,
        details: "Unable to send this email due to some technical problem.",
      });
    }
  }
}
export default new SendContactRes();
