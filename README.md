# 📋 TaskSync Backend

TaskSync is a task management backend API built with **Node.js**, **Express**, and **MongoDB**. It supports full **user authentication**, **project and task management**, and provides a solid foundation for a collaborative task-tracking system.

---

## 🚀 Features

- 🔐 JWT-based User Authentication (Login, Signup)
- 🧑‍🤝‍🧑 Manage Projects & Team Members
- 📌 Task CRUD operations within projects
- 🔄 Assign tasks to users
- 📁 MongoDB for data storage via Mongoose

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Environment Config**: dotenv

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/adityasgit25/TaskSync-Backend.git
cd TaskSync-Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root directory with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000

### 4. Run the Server
```bash
npm run dev
```

Server will be running on http://localhost:3000
