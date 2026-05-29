# project-management-gravitones

# ✅ Assignment: Scalable Task Management Backend API

## 🎯 Objective
Build a **production-ready backend system** for a task/project management application with focus on:
- API design
- Data modeling
- Performance
- Security
- Code quality

---

# 🧩 Core Requirements

## 1. Tech Stack (Mandatory)
- Node.js + Express
- MongoDB (with Mongoose)
- JWT Authentication
- Use async/await properly

---

## 2. Features

### 🔐 Authentication & Authorization
- User signup/login
- Password hashing (bcrypt)
- JWT-based authentication
- Role-based access:
  - `Admin`
  - `User`

---

### 📁 Project Management
- Create Project
- Add members to project
- Only project owner/admin can:
  - Delete project
  - Add/remove members

**Project Schema (example):**
```js
{
  name: String,
  description: String,
  owner: ObjectId,
  members: [ObjectId],
  createdAt: Date
}
```

---

### ✅ Task Management
- Create task under project
- Assign task to user
- Update task status:
  - `todo`, `in-progress`, `done`

- Add comments to task

**Task Schema:**
```js
{
  title: String,
  description: String,
  projectId: ObjectId,
  assignedTo: ObjectId,
  status: String,
  comments: [
    {
      userId: ObjectId,
      comment: String,
      createdAt: Date
    }
  ]
}
```

---

### 🔍 Advanced Backend Features (IMPORTANT)

#### ✅ Filtering + Pagination + Sorting
- Get tasks with:
  - Filter by status
  - Pagination
  - Sort by createdAt / status

Example:
```
GET /tasks?status=done&page=2&limit=10&sortBy=createdAt
```

---

#### ✅ Aggregation (Mandatory)
- Endpoint: Project summary
  - Total tasks
  - Completed tasks
  - Tasks per user

---

#### ✅ Rate Limiting
- Prevent API abuse (e.g., Express rate limit)

---

#### ✅ Error Handling (VERY IMPORTANT)
- Centralized error handling middleware
- Proper HTTP status codes

---

#### ✅ Data Validation
- Use Joi / Zod / express-validator


# 📡 API Endpoints (Minimum Required)

| Method | Route | Description |
|-------|------|------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login |
| POST | /projects | Create project |
| GET | /projects | List user projects |
| POST | /tasks | Create task |
| GET | /tasks | Get tasks with filters |
| PATCH | /tasks/:id | Update task |
| POST | /tasks/:id/comments | Add comment |

---

# 📦 Deliverables

Candidate should submit:
- GitHub repo