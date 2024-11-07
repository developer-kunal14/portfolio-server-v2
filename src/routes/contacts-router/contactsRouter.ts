/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Contact router
 * Author      : Kunal Chandra Das
 * Date        : 03.11.2024
 * Version     : 2.0.0
 * Details     : This file contains the routes for handling contact inquiries
 *               submitted by users. The router defines the HTTP endpoints for
 *               submitting, viewing, and responding to contact inquiries.
 *
 *               1. **POST /contact/application**: Allows users to submit a new
 *                  contact inquiry with their details and message.
 *
 *               2. **GET /contact/application**: Retrieves all submitted contact
 *                  inquiries, accessible to authenticated admins or support staff.
 *
 *               3. **GET /contact/application/:id**: Retrieves a specific contact
 *                  inquiry by its unique ID, allowing the authenticated user or
 *                  admin to view the details.
 *
 *               4. **POST /contact/application/:id/response**: Allows admins to
 *                  respond to a specific contact inquiry by sending an email response.
 *
 *               5. **DELETE /contact/application/:id**: Deletes a specific contact
 *                  inquiry by its ID, accessible to authenticated admins.
 *
 *               The router ensures proper handling of contact data, with validation
 *               and authorization checks where necessary.
 */

import { Router } from "express";
import ContactApplication from "../../controllers/contacts/postApplication";
import ContactInfo from "../../controllers/contacts/getApplication";
import RequestedApplication from "../../controllers/contacts/deleteApplication";
import SendContactRes from "../../controllers/contacts/sendContactResponse";
import AuthValidator from "../../middlewares/auth-validator/authValidator";

const contactsRouter = Router();

contactsRouter.post("/application", ContactApplication.postCtrl);

contactsRouter.post(
  "/response/:id",
  AuthValidator.validate,
  SendContactRes.sendEmail
);

contactsRouter.get(
  "/application/:id",
  AuthValidator.validate,
  ContactInfo.getCtrl
);

contactsRouter.get("/application", AuthValidator.validate, ContactInfo.getCtrl);

contactsRouter.delete(
  "/application/:id",
  AuthValidator.validate,
  RequestedApplication.deleteCtrl
);

export default contactsRouter;
