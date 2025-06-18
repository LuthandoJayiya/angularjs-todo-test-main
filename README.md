
# AngularJS To-Do App – Technical Assessment

Welcome to the **FlexiMetaDoc To-Do App Test Project**. This is a legacy AngularJS-based to-do list application, and your task is to turn it into a fully functional, authenticated, and persistent system using Microsoft technologies.

---

## 🧾 Project Overview

This application manages to-do items with full **CRUD** capabilities: Create, Read, Update, and Delete. You are provided with:

- `index.html`
- `app.js`
- `style.ts`

Your objective is to complete the application by implementing:

1. Identity management and login system
2. Full backend integration with **Microsoft SQL Server**
3. Environment variable management
4. An **optional** stand-out feature in C# to showcase your capabilities

---

## ✅ Requirements

### 1. Identity Management
- Add authentication (JWT or cookie-based)
- Enable login and user registration
- Ensure only authenticated users can access and manage their own tasks

### 2. Backend API (.NET Core / C#)
- Build RESTful endpoints for to-do operations
- Use **Entity Framework Core** with SQL Server
- Follow best practices in API design and error handling

### 3. Database Integration (SQL Server)
- Design schema to support:
  - Users
  - To-do items linked to users
- Provide either a SQL script or use EF migrations

### 4. Environment Variables
- Use environment variables for config like connection strings and secrets
- Provide a `.env.sample` file or config template

---

## 💡 Optional Bonus Feature

Add a custom feature that highlights your skills in **C#**. Ideas include (but are not limited to):

- Real-time task updates using SignalR
- Notification system
- Advanced search and filtering
- Task categorization or tagging
- Dashboard with stats/analytics
- Offline support with local caching

---

## 🛠️ Setup Guide

### Frontend
```bash
# Launch index.html with any local server or browser
open index.html
```

### Backend
```bash
cd backend/
dotnet restore
dotnet build
dotnet run
```

### Database
- Use SQL Server (Express or LocalDB)
- Run schema script or let EF Core generate tables
- Update your connection string in `appsettings.Development.json`

---

## 📁 Suggested Folder Structure

```
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.ts
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   └── Program.cs
├── README.md
├── .env.sample
└── todo_schema.sql
```

---

## ⏰ Time Limit

Once you clone or download the test, you have **1 day (24 hours)** to complete and push your changes.

---

## 📬 Submission Instructions

Push your work to a **GitHub repository** and share the link. Ensure all commits are meaningful and your code is clean and commented.

---

Good luck, and have fun building!
