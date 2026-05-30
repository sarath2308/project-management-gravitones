# 📋 Project Management Application

A production-ready, scalable task and project management backend API built with Node.js, Express, and MongoDB. This application provides comprehensive project and task management capabilities with user authentication, role-based access control, and advanced filtering features.

---

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

---

# 🛠️ Prerequisites & Requirements

## System Requirements
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher (comes with Node.js)
- **MongoDB**: v5.0 or higher (local or MongoDB Atlas)

## Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
# For local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/project-management

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

# 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-management-gravitones
```

### 2. Install Dependencies

**Backend Setup:**
```bash
cd backend
npm install
```

**Frontend Setup (Optional):**
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables
```bash
# In backend directory
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 4. Verify MongoDB Connection
Ensure MongoDB is running:
- **Local**: `mongod` should be running on `localhost:27017`
- **MongoDB Atlas**: Ensure your connection string is correct in `.env`

---

# 🚀 Running the Project

### Backend Server
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend (Optional)
```bash
cd frontend
npm run dev
```

The frontend will typically be available at `http://localhost:5173`

---

# 📚 Project Structure

```
project-management-gravitones/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── repositories/    # Data access layer
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── validation/      # Request validation schemas
│   │   ├── utils/           # Helper utilities
│   │   └── server.js        # Entry point
│   └── package.json
├── frontend/                # React frontend (if applicable)
└── README.md
```

---

# 🧪 Testing the API

Use **Postman**, **Thunder Client**, or **cURL** to test the endpoints:

### Example: Register a User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

# 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Verify connection string in `.env`
- Check network connectivity for MongoDB Atlas

### Port Already in Use
```bash
# Change PORT in .env or use:
PORT=3001 npm start
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

---

# 📝 License

This project is part of the BroCamp machine task assignment.