# **Smart Task Manager**

A simple web application to manage **projects, teams, and tasks**.  
Users can assign tasks to team members, track workload capacity, and balance tasks using a **“Reassign Tasks”** button.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**

### **1. User & Team Setup**

- Users can register and log in.
- Create teams and add members manually (no email required).
- Each team member has:
  - **Name**
  - **Role**
  - **Capacity** (0–5 tasks comfortably)

### **2. Project & Task Management**

- Create projects and link them to a specific team.
- Add tasks under a project.
- Each task includes:
  - **Title**
  - **Description**
  - **Assigned Member** (from project’s team or “Unassigned”)
  - **Priority:** Low / Medium / High
  - **Status:** Pending / In Progress / Done
- Add, Edit, Delete, and Filter tasks by Project or Member.

### **3. Task Assignment Flow**

- Select a Project (team auto-links).
- Assign tasks manually or use **Auto-assign** to pick the member with the least load.
- Show each member’s current tasks vs capacity.
- Warn if a member is over capacity with options:
  - `[Assign Anyway]` or `[Choose Another]`

### **4. Auto Reassignment**

- Reassign tasks when a member exceeds their capacity.
- High Priority tasks remain with the current assignee.
- Only Low and Medium priority tasks are reassigned.
- All changes are recorded in the **Activity Log**.

---

## **Tech Stack**

| Category            | Technology                                      |
| ------------------- | ----------------------------------------------- |
| Backend             | Node.js, Express, MongoDB, Mongoose, TypeScript |
| Authentication      | JWT, bcrypt                                     |
| File Handling       | Multer                                          |
| Validation          | Zod, Validator                                  |
| Email Service       | Nodemailer                                      |
| Payment Integration | SSLCommerz                                      |
| HTTP Requests       | Axios                                           |
| Environment         | dotenv                                          |
| Others              | cookie-parser, cors, http-status                |

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/your-username/smart-task-manager.git
cd smart-task-manager
```

## **Installation**

2. Install dependencies:

```bash
npm install

```

3. Configure environment variables: Create .env file in the root directory:

```bash
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=

```

4. Start the development server:

```bash
npm run dev

```

The app will run at http://localhost:5000.

5. Project Structure

```bash
smart-task-manager/
│
├─ src/
│  ├─ controllers/       # Request handlers
│  ├─ models/            # Mongoose models
│  ├─ routes/            # API routes
│  ├─ services/          # Business logic & helpers
│  ├─ middlewares/       # Express middlewares
│  ├─ utils/             # Utility functions
│  └─ index.ts           # App entry point
│
├─ package.json
├─ tsconfig.json
├─ .env
└─ README.md


```

6. Scripts

```bash
| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start server in development mode |
| `npm run build` | Build TypeScript files           |
| `npm start`     | Start server in production mode  |
| `npm run lint`  | Run ESLint checks                |


```

6. API Endpoints

```bash
| Method | Endpoint                     | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| POST   | `/api/v1/auth/register`      | Register new user                 |
| POST   | `/api/v1/auth/login`         | Login user                        |
| POST   | `/api/v1/projects`           | Create project                    |
| GET    | `/api/v1/projects`           | Get all projects for user         |
| POST   | `/api/v1/tasks/create-task`  | Create task                       |
| GET    | `/api/v1/tasks`              | Get tasks by project or member    |
| PATCH  | `/api/v1/tasks/:id`          | Update task                       |
| DELETE | `/api/v1/tasks/:id`          | Delete task                       |
| POST   | `/api/v1/tasks/reassign/:id` | Auto reassign tasks for a project |
               |


```
