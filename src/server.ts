/* 
 Project Name: Kunal Chandra Das Official Portfolio
 Author: Kunal Chandra Das
 Description: This is the main application file for the Kunal Chandra Das Portfolio. 
              It sets up an Express server to handle incoming requests and process 
              them accordingly, sending appropriate responses back to the client.
 Date: 29.10.2024 
 Version: 2.0.0
 *
 Functionality:
 - Initializes an Express application and configures middleware for handling 
   CORS, JSON requests, and URL-encoded data.
 - Defines a root route that returns a welcome message and a status code of 200.
 - Includes commented-out error handling middleware for managing potential 
   errors from file uploads (using Multer) and other request errors.
 *
 Usage:
 Use this application file to start the server and handle HTTP requests 
 related to the Kunal Chandra Das portfolio. It serves as the entry point 
 for client interactions with the backend services.
 */

import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import admiAuthenticationRouter from "./routes/auth-router/authRouter";
import projectsRouter from "./routes/projects-router/projectsRouter";
import multer from "multer";
import reviewsRouter from "./routes/reviews-router/reviewsRouter";
import resumeRouter from "./routes/resume-router/resumeRouter";
import blogRouter from "./routes/blog-router/blogRouter";
import contactsRouter from "./routes/contacts-router/contactsRouter";

const server: Application = express();

// Genaral Middleware
server.use(cors());
server.use(express.json()); // Using Express's built-in JSON middleware
server.use(express.urlencoded({ extended: true })); // URL-encoded data

// Base Route Endpoint
server.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to (kunalchandradas.tech) backend server",
    owner: "Kunal Chandra Das.",
    admin: "adinportal.kunalchandradas.tech",
    main: "kunalchandradas.tech",
    route: "Home",
  });
});

// Register routers
server.use("/api/v2/auth/admin", admiAuthenticationRouter); // Admin authentication routes
server.use("/api/v2/all/projects", projectsRouter); // Projects routes
server.use("/api/v2/reviews", reviewsRouter); // Reviews routes
server.use("/api/v2/resume", resumeRouter); // Resume routes
server.use("/api/v2/blogs", blogRouter); // Blogs routes
server.use("/api/v2/contacts", contactsRouter); // Contacts routes
// Error handling middleware
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    res.status(500).send(err.message);
  } else if (err) {
    // Handle other errors
    res.status(400).send(err.message);
  } else {
    next(); // Pass to the next middleware if no error
  }
});

export default server;
