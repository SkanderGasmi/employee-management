# Employee Management CRUD Web Application

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Functionality](#functionality)  
- [Tech Stack](#tech-stack)  
- [Setup Instructions](#setup-instructions)  
- [Screenshots](#screenshots)  
- [Why I Built This](#why-i-built-this)  
- [Future Improvements](#future-improvements)  
- [License](#license)  

---

## Overview

This is a **full-stack employee management web application** built to showcase my skills in **Node.js, MongoDB, REST APIs, and front-end development**.  
The app allows users to **create, read, update, and delete records** for employees and departments, providing a foundation for digital workforce management.  

The project is fully **containerized using Docker**, making it easy to run locally or deploy to production.

---

## Features

- **Backend**: Node.js with Express.js server  
- **Database**: MongoDB, connected using Mongoose  
- **REST API**: Endpoints for CRUD operations on employees and departments  
- **Frontend**: Responsive web UI built with HTML, CSS, and JavaScript  
- **Environment Management**: Configurable via `.env`  
- **Dockerized**: Easy setup and deployment with Docker and docker-compose  

---

## Functionality

- Add new employees and departments  
- View all employees and departments  
- Update employee or department information  
- Delete employees or departments from the database  
- Interact with the database through a clean and simple web interface  

---

## Tech Stack

- **Node.js** & **Express.js**  
- **MongoDB** & **Mongoose**  
- **HTML / CSS / JavaScript**  
- **Docker & Docker Compose**  
- **dotenv** for environment configuration  

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/SkanderGasmi/employee-management.git
cd employee-management
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the project root with the following content:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydb
```
4. Run the server locally:

```bash
node index.js
```

5. Open the web app in your browser:

```bash
http://localhost:3000
```

## Why I Built This

I built this project to demonstrate my ability to develop full-stack web applications, including database design, REST API development, and front-end integration.
It showcases my skills in building scalable, maintainable applications and my familiarity with modern development tools like Docker.

## Future Improvements

- Add authentication and user roles

- Implement search and filtering for employees and departments

- Enhance UI with frameworks like React or Vue.js

- Add automated testing for backend and frontend


