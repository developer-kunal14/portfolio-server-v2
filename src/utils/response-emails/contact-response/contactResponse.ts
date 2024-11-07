/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Send response to contact person
 * Author      : Kunal Chandra Das
 * Date        : 28.10.2024
 * Version     : 2.0.0
 * Details     : This class handles sending email responses to users. It uses
 *               the `nodemailer` package to send emails based on the provided
 *               parameters (recipient's email, subject, body, etc.).
 *
 *               **Method: `sendemail`**
 *
 *               This method sends an email to the user in response to their
 *               contact inquiry. It takes the recipient's email, user name,
 *               subject, email body, and response object as parameters and
 *               sends an HTML email using a configured SMTP server.
 *
 *               The method works as follows:
 *
 *               1. **Create a Transporter**: It creates a transporter using
 *                  `nodemailer.createTransport()`, which connects to the SMTP
 *                  server using credentials provided in the `envConfig` (such as
 *                  the email host, port, and authentication details).
 *
 *               2. **Prepare Email Details**: The method formats the email body
 *                  as an HTML message, including a personalized greeting with
 *                  the recipient's name and the current date. The date is formatted
 *                  according to the `en-IN` locale (Indian format: `DD/MM/YYYY`).
 *
 *               3. **Send Email**: The `transporter.sendMail()` method is used
 *                  to send the email with the defined subject, body, and recipient
 *                  details.
 *
 *               4. **Error Handling**: If there is any error while sending the
 *                  email (e.g., SMTP issues), the method responds with a `500`
 *                  status code, including an error message and further instructions
 *                  for the user. The error message is logged for technical support.
 *
 *               5. **Success Response**: If the email is successfully sent,
 *                  the method responds with a `200` status code, including the
 *                  message ID of the sent email and a notification confirming
 *                  that the email has been sent successfully.
 *
 *               **Parameters**:
 *               - `sendTo`: The recipient's email address (string).
 *               - `userName`: The recipient's name for personalization (string).
 *               - `subject`: The subject of the email (string).
 *               - `mailBody`: The body content of the email (string).
 *               - `response`: The response object for sending status to the client.
 *
 *               **Return Type**: The method does not return anything directly
 *               but sends a response back to the client (success or error response).
 *
 *               This class is useful for automating email communication,
 *               particularly in response to user inquiries or requests submitted
 *               through a contact form.
 */

import nodemailer from "nodemailer";
import envConfig from "../../../config/envConfig";

class ContactResponse {
  public async sendemail(
    sendTo: string,
    userName: string,
    subject: string,
    mailBody: string,
    response: any
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: envConfig.emailHostProtocol,
      port: envConfig.emailPort,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: envConfig.emailHostUser,
        pass: envConfig.emailHostPassword,
      },
    });
    const date = new Date();
    const todaysDate = date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const mailOptions = {
      from: envConfig.emailHostUser, // Sender address
      to: sendTo, // List of receivers
      subject,
      html: `<body>
          <h1>Dear, ${userName}</h1>
        <p>${mailBody}</p>
        <p>${todaysDate}</p>
        </body>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return <any>response.status(500).json({
          issue: error.message,
          details:
            "Unable to send this mail, due to some technical problem. Please try again later.",
          alert:
            "If the issue not resolve autometically then contact to your tech support team.",
        });
      } else {
        return <any>response.status(200).json({
          message: "Email has been send successfully!",
          sending_id: info.messageId,
          notification: `The mail has been successfully send to this:${sendTo} adress.`,
        });
      }
    });
  }
}

export default ContactResponse;
