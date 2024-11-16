# Task Management System

A comprehensive Task Management System for software companies, allowing role-based access for admins and users. Admins manage all tasks in the system, while users can view, update, and mark tasks assigned to them as complete.

## Features

### Admin Features
- **Task Management:** Perform CRUD (Create, Read, Update, Delete) operations on all tasks.
- **Assign Tasks:** Assign tasks to specific users.
- **View Tasks:** View and manage all tasks in the system with pagination.

### User Features
- **View Assigned Tasks:** View all tasks assigned to them with details like title, description, and status.
- **Update Task Status:** Mark tasks as "In Progress" or "Completed."

## Technologies Used

### Frontend
- **React.js:** For dynamic and responsive UI.
- **Tailwind CSS:** For modern styling and layouts.

### Backend
- **Node.js** and **Express.js:** To build the backend API.
- **JSON Web Tokens (JWT):** For authentication and session management.

### Database
- **MySQL:** To store user and task data.

## Installation and Setup

### Prerequisites
- Node.js installed
- MySQL database set up
- Git installed

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
