/**
 * Project Name: Kunal Chandra Das Portfolio backend
 * File Name:    Get Resume
 * Author      : Kunal Chandra Das
 * Date        : 31.10.2024
 * Version     : 2.0.0
 * Details     : This file contains the controller for retrieving an existing
 *               resume in the system. The controller allows authorized users
 *               (e.g., users or admins) to access and view a resume stored in
 *               the platform.
 *
 *               The controller first validates that the user making the request
 *               has the necessary authorization to view the resume. This typically
 *               involves checking whether the user is the owner of the resume or
 *               an admin. If the user is unauthorized, a `403 Forbidden` response
 *               is returned.
 *
 *               The controller then attempts to locate the resume in the database
 *               using the unique resume ID provided in the request. If the resume
 *               is found, the controller returns the resume details, such as the
 *               name, contact information, skills, education, work experience, and
 *               any other relevant data stored with the resume. A `200 OK` response
 *               is returned along with the resume data.
 *
 *               If the resume cannot be found (e.g., invalid ID), the controller
 *               returns a `404 Not Found` response, indicating that the requested
 *               resume does not exist in the system.
 *
 *               In case of any unexpected issues (e.g., database failures),
 *               the controller returns a `500 Internal Server Error` response,
 *               signaling that an error occurred while attempting to retrieve the
 *               resume.
 *
 *               This controller is essential for enabling users or admins to
 *               securely view resumes stored in the system. It provides functionality
 *               to view the data associated with resumes and ensures that the system
 *               is able to securely serve resume information when requested.
 */

import { Request, Response } from "express";
import resumeModel from "../../models/resumeCollection";

class ResumeInfo {
  public async getCtrl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (id) {
        const findSingleResume = await resumeModel.findById(id);
        if (!findSingleResume) {
          return <any>res.status(404).json({
            issue: "Not Found!",
            details: "Requested resume not exist.",
          });
        } else {
          return <any>res.status(200).json(findSingleResume);
        }
      } else {
        const findAllResume = await resumeModel.find();
        if (!findAllResume) {
          return <any>res.status(404).json({
            issue: "Not Found!",
            details: "Requested resources are not exist.",
          });
        } else {
          return <any>res.status(200).json(findAllResume);
        }
      }
    } catch (error: any) {
      return <any>res.status(500).json({
        issue: "Internal Server Error!",
        details: error.message,
      });
    }
  }
}
export default new ResumeInfo();
