# Kunal Portfolio Server

## Author: Kunal Chandra Das.

## Description

The **Kunal Portfolio Server** is the backend of the official portfolio of **Kunal Chandra Das**, a Software Developer and Mern Stack Developer. This backend is built with **Node.js**, **Express**, and **TypeScript**, and it provides the necessary API endpoints to manage various sections of the portfolio, including authentication, projects, blog articles, reviews, resumes, and contact inquiries.

**Version:** 2.0.0

## Features

- **Authentication**: Admin login and password management (JWT-based).
- **Projects**: CRUD operations for managing portfolio projects.
- **Blog Articles**: CRUD operations for blog articles.
- **Resumes**: Allows uploading and managing resumes.
- **Reviews**: Submitting, deleting, and retrieving client reviews.
- **Contact Us**: Handling user inquiries and admin responses.

- **Base Url** `server.kunalchandradas.tech`

## Orginal Url with API Endpoints

### 1. **Authentication Routes**

- **POST** `/api/v2/auth/admin/login`: Admin login (Authenticate with email and password).
- **POST** `/api/v2/auth/admin/register`: New admin registration (Authenticate with name, email password and confirm password).
- **POST** `/api/v2/auth/admin/reset-password-link`: Send a password reset link to the admin's email.
- **PUT** `/api/v2/auth/admin/reset-password/:id/:token`: Reset the admin password with the token.
- **GET** `/api/v2/auth/admin/current-user`: Get the currently logged-in admin user details.
- **PUT** ``/api/v2/auth/admin/change-password`: Change the admin's password.

### 2. **Projects Routes**

- **POST** `/api/v2/all/projects/operation/url`: Create a new project.
- **GET** `/api/v2/all/projects/operation/url`: Get all projects.
- **GET** `/api/v2/all/projects/operation/url/:id`: Get a single project by its ID.
- **PATCH** `/api/v2/all/projects/operation/url/:id`: Update an existing project.
- **DELETE** `/api/v2/all/projects/operation/url/:id`: Delete a project by ID.

### 3. **Blog Routes**

- **POST** `/api/v2/blogs/content/`: Create a new blog article.
- **GET** `/api/v2/blogs/content/`: Get all blog articles.
- **GET** `/api/v2/blogs/content/:id`: Get a specific blog article by ID.
- **PATCH** `/api/v2/blogs/content/:id`: Update an existing blog article.
- **DELETE** `/api/v2/blogs/content/:id`: Delete a blog article by ID.

### 4. **Resume Routes**

- **POST** `/api/v2/resumes/kunal-chandra-das`: Upload a new resume.
- **GET** `/api/v2/resumes/kunal-chandra-das`: Get all resumes.
- **GET** `/api/v2/resumes/kunal-chandra-das/:id`: Get a specific resume by ID.
- **PUT** `/api/v2/resumes/kunal-chandra-das/:id`: Update an existing resume.
- **DELETE** `/api/v2/resumes/kunal-chandra-das/:id`: Delete a resume by ID.

### 5. **Review Routes**

- **POST** `/api/v2/reviews/client`: Post a new client review.
- **GET** `/api/v2/reviews/client`: Get all client reviews.
- **DELETE** `/api/v2/reviews/client/:id`: Delete a specific client review by ID.

### 6. **Contact Routes**

- **POST** `/api/v2/contacts/application`: Submit a new contact inquiry.
- **GET** `/api/v2/contacts/application`: Get all contact inquiries (for admin use).
- **GET** `/api/v2/contacts/application/:id`: Get a specific contact inquiry by ID.
- **POST** `/api/v2/contacts/response/:id`: Admin responds to a specific contact inquiry.
- **POST** `/api/v2/contacts/application/:id`: Delete a specific contact inquiry.

## Requirements

- **Node.js** (>= 16.x.x)
- **MongoDB** (for database storage)
- **Cloudinary** (for storing images and files)
- **Nodemailer** (for sending email responses)

* Visit package,json for more info.

## Installation

Follow these steps to install and run the Kunal Portfolio Server locally:
following npm

1. **Clone the repository**:

   ```bash
   git clone -b server_v2 https://github.com/Kunal-Ch-Das-Official/official-portfolio.git
   cd kunal-portfolio-server
   ```

2. **Install npm**:

   ```bash
    npm install
   ```

3. **Add environment variable**:

   ```bash
    add your own .env
   ```

4. **Run in dev env**:

   ```bash
    npm run dev
   ```

5. **Run in projuction env**:

   ```bash
    npm run build
    npm start
   ```

# Folder Structure

- /kunal-portfolio-server
- /controllers # Controller files for handling requests
- /middlewares # Middlewares like auth validation file uploader
- /models # Mongoose models for MongoDB
- /routes # API routes
- /utils # Utility functions (e.g., email sender)
- /config # Configuration files (e.g., environment variables, cloud config etc)
- /dist # Compiled JavaScript files (after build)
- .env # Environment configuration file
- package.json # Project dependencies and scripts
- tsconfig.json # TypeScript configuration
- README.md # Project documentation

---

You can now copy and paste this README file into your project. Make sure to adjust any project-specific details like repository URL, `LICENSE` file location, or any other configurations unique to your setup!
