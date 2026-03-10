# 🎬 Movie API Backend

A RESTful backend API for managing movies built with **Node.js**, **Express.js**, and **MongoDB**.
This project allows users to perform CRUD operations on movies and manage movie data efficiently.

---

HOME ROUTE

<img width="1920" height="1080" alt="Screenshot 2026-03-10 124916" src="https://github.com/user-attachments/assets/fe6dedb7-a8e4-4d84-8278-3c5f92c29d4a" />



## 🚀 Features

* Create a new movie
* Get all movies
* Get movie by ID
* Update movie details
* Delete a movie
* Error handling middleware
* Environment variable configuration
* CORS enabled
* MongoDB database connection

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Dotenv**
* **Cors**
* **Nodemon**

---

## 📁 Project Structure

```
movie-project
│
├── config
│   └── db.js
│
├── controllers
│   └── movieController.js
│
├── models
│   └── movieModel.js
│
├── routes
│   └── movieRoutes.js
│
├── middleware
│   └── httpError.js
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/movie-project.git
```

Navigate to the project folder:

```bash
cd movie-project
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a **.env** file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

