# LearnSphere - Teacher-Student Course Platform

## Project Overview
LearnSphere is a full-stack MERN application designed as a simple and interactive
platform to connect teachers and students. The system provides a secure authentication
service with features like JWT-based login, password reset, and email verification. The core
functionality allows users to register as either a "teacher" or a "student." Teachers can log
in to a dedicated dashboard to create and manage their courses, while students can
browse and enroll in available courses.
This project was developed following modern web practices, including a modular backend
architecture, a responsive React frontend, containerization with Docker for consistent
environments, and is deployed to the cloud using Azure App Service.

## Technologies Used 

**Frontend:**
* React (with Vite)
* JavaScript
* Bootstrap 5
* CSS3
* Axios

**Backend:**
* Node.js
* Express.js
* MongoDB (with Mongoose)
* JSON Web Tokens (JWT) for authentication
* Bcrypt.js for password hashing
* Nodemailer for sending emails
* Joi for validation

**Database:**
* MongoDB Atlas (Cloud)
* MongoDB (Local Docker container for development)

**DevOps & Deployment:**
* Docker & Docker Compose
* Microsoft Azure (App Service, Container Registry)
* Git & GitHub for version control

## Setup Instructions

### Prerequisites
* Node.js (v18 or higher)
* Docker & Docker Compose
* An account with MongoDB Atlas (for database) and Brevo (for email service)

### Local Development Setup (with Docker)

1. **Clone the repository:**
 ```
 git clone https://github.com/thesarakasun/INTE-21323-project.git
 cd C:\2yr2sem
 ```
2. **Configure Backend Environment:**
 * Navigate to the `/server` directory and create a `.env` file.
 * Populate it with your `MONGO_URI`, `JWT_SECRET`, and email service credentials.

3. **Configure Docker Environment:**
 * In the project's root directory, create a `.env` file.
 * Add the line: `VITE_API_BASE_URL=http://localhost:5000`

 4. **Build and Run:**
 * From the root directory, run the command:
 ```
 docker-compose up --build
 ```
5. The application will be available at:
 * **Frontend:** `http://localhost:5173`
 * **Backend API:** `http://localhost:5000`

## API Usage (Swagger UI)
Live, interactive API documentation is generated using Swagger/OpenAPI. Once the
backend server is running, you can access the documentation at:

**[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
