# Smart Task Manager

A simple web application to manage **projects, teams, and tasks**.  
Users can assign tasks to team members, track workload capacity, and balance tasks using a **“Reassign Tasks”** button.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 1. User & Team Setup

- Users can register and log in.
- Create teams and add members manually (no email required).
- Each team member has:
  - Name
  - Role
  - Capacity (0–5 tasks comfortably)

### 2. Project & Task Management

- Create projects and link them to a specific team.
- Add tasks under a project.
- Each task includes:
  - Title
  - Description
  - Assigned Member (from project’s team or “Unassigned”)
  - Priority: Low / Medium / High
  - Status: Pending / In Progress / Done
- Add, Edit, Delete, and Filter tasks by Project or Member.

### 3. Task Assignment Flow

- Select a Project (team auto-links).
- Assign tasks manually or use **Auto-assign** to pick the member with the least load.
- Show each member’s current tasks vs capacity.
- Warn if a member is over capacity with options:
  - `[Assign Anyway]` or `[Choose Another]`

### 4. Auto Reassignment

- Reassign tasks when a member exceeds their capacity.
- High Priority tasks remain with the current assignee.
- Only Low and Medium priority tasks are reassigned.
- All changes are recorded in the **Activity Log**.

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, TypeScript  
**Authentication:** JWT, bcrypt  
**File Handling:** Multer  
**Validation:** Zod, Validator  
**Email Service:** Nodemailer  
**Payment Integration:** SSLCommerz  
**HTTP Requests:** Axios  
**Environment Management:** dotenv  
**Others:** cookie-parser, cors, http-status

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/smart-task-manager.git
cd smart-task-manager
```
