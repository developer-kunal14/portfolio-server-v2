import nodemailer from "nodemailer";
import envConfig from "../../../config/envConfig";

class ResetPasswordLink {
  public async sendMail(
    sendTo: string,
    userName: string,
    corespondingLink: string,
    response: any
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: envConfig.emailHostProtocol,
        port: envConfig.emailPort,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: envConfig.emailHostUser,
          pass: envConfig.emailHostPassword,
        },
      });

      const mailOptions = {
        from: envConfig.emailHostUser, // Sender address
        to: sendTo, // List of receivers
        subject: "Kunal Chandra Das - Admin User Password Reset Request",
        html: `<body>
        
        <h1>Dear, ${userName}</h1>
        <a href=${corespondingLink}>Here is your reset button</a>
        
        </body>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return response.status(500).json({
            issue: error.message,
            details:
              "Unable to send this mail due to technical problem, please try again later",
          });
        } else {
          return response.status(200).json({
            message: "Email has been send successfully",
            resetLink: corespondingLink,
            notification: `Password reset link has been sended to this:${sendTo} email account.${info}`,
          });
        }
      });
    } catch (error: any) {
      return response.status(500).json({
        issue: error.message,
        details: "Unable to perform this task due to some technical problem.",
        message:
          "Please try again later, or if the issue not resolve autometically then contact with your tech support team.",
      });
    }
  }
}
export default ResetPasswordLink;
/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Send reset password link
 * Author      : Kunal Chandra Das
 * Date        : 28.10.2024
 * Version     : 2.0.0
 * Details     : This class handles sending a password reset link to the user
 *               via email. It uses the `nodemailer` package to send emails and
 *               includes a dynamically generated reset link in the email body.
 *
 *               **Method: `sendMail`**
 *
 *               This method sends an email to the user with a link to reset
 *               their password. The email includes a personalized greeting and
 *               a clickable reset button that directs the user to the password
 *               reset page.
 *
 *               The method works as follows:
 *
 *               1. **Create a Transporter**: It creates a transporter using
 *                  `nodemailer.createTransport()`, connecting to the SMTP server
 *                  with the credentials provided in `envConfig` (such as email host,
 *                  port, and authentication details).
 *
 *               2. **Prepare Email Details**: The email is constructed with the
 *                  subject `"Kunal Chandra Das - Admin User Password Reset Request"`.
 *                  It includes an HTML body with a personalized greeting (using
 *                  `userName`) and a clickable reset link (`corespondingLink`).
 *
 *               3. **Send Email**: The method uses `transporter.sendMail()` to
 *                  send the email, including the recipient's email address, subject,
 *                  and body content. The reset link is embedded in the body as an
 *                  anchor tag (`<a href=...>`).
 *
 *               4. **Error Handling**: If any error occurs during the email sending
 *                  process (e.g., SMTP issues), the method responds with a `500`
 *                  status code, including an error message and further instructions
 *                  for the user. The error message will be related to a technical issue.
 *
 *               5. **Success Response**: If the email is successfully sent, the
 *                  method responds with a `200` status code, including the reset link
 *                  and a notification that the email was sent to the user.
 *
 *               **Parameters**:
 *               - `sendTo`: The recipient's email address (string).
 *               - `userName`: The recipient's name for personalization in the greeting
 *                 (string).
 *               - `corespondingLink`: The password reset link (string) to be included
 *                 in the email.
 *               - `response`: The response object for sending the status back to the client.
 *
 *               **Return Type**: The method does not return anything directly but
 *               sends a response back to the client (success or error response).
 *
 *               This class is useful for securely sending password reset links
 *               to users who have forgotten their passwords, allowing them to
 *               reset their credentials via email.
 */
