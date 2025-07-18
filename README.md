# Taskly

## Overview

This project sets up AgileFlow, a full-stack web application designed to mimic the core functionalities of Jira, focusing on agile project management and issue tracking. AgileFlow provides a centralized platform for teams to plan, track, and manage their software development lifecycle (SDLC) with an emphasis on flexibility and collaboration.

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed on your system:

| Tool         | Version  |
|--------------|----------|
| **Node.js**  | >= 18.x  |
| **Yarn**     | >= 1.22  |
| **npm**      | >=8.x    |
| **Git**      | Latest   |

---

### 2️⃣ Features
AgileFlow aims to provide a robust set of features for effective project management:

Project Management: Create and manage multiple projects, each with its own settings and team members.

Issue Tracking:

Assign issues to team members.

Set priorities, due dates, and estimates.

Track issue status through customizable workflows (e.g., To Do, In Progress, Code Review, Done).

Agile Boards:

Kanban Boards: Visualize workflow, move issues through stages, and identify bottlenecks.

User Authentication & Authorization: Secure user registration, login, and role-based access control (e.g., Project Admin, Developer, Viewer).

### 3️⃣ Setup Instructions

#### Clone the Repository (if applicable)

```bash
git clone Taskly
cd taskly
```

### Install Dependencies

```bash
npm install
```

### 4️⃣ Tech stacks 
Taskly leverages a modern and efficient technology stack:

Frontend:

Next.js: A React framework for building fast, scalable, and SEO-friendly web applications with server-side rendering (SSR) and static site generation (SSG) capabilities.

Backend:

Hono.js: A lightweight, blazing-fast, and modern web framework for the edge, ideal for building robust and performant APIs.

Database & BaaS (Backend as a Service):

Appwrite: An open-source, end-to-end backend server that provides a powerful set of APIs and tools for building modern applications, handling user authentication, database management, and more.

### 5️⃣: Run the Application

```bash
npm run dev
```

### 6️⃣ : Project Structure
```bash
    taskly/                  # Next.js Frontend Application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── app/                  # Next.js App Router (pages, layouts, API routes for client-side)
│   │   ├── components/           # Reusable React components (e.g., IssueCard, ProjectHeader)
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Client-side utility functions (e.g., Appwrite SDK initialization, API calls)
│   │   ├── styles/               # Global styles and Tailwind CSS configuration
│   │   └── types/                # TypeScript type definitions
│   ├── .env.local.example        # Example environment variables for frontend
│   ├── package.json
│   └── tsconfig.json
├── .gitignore                    # Specifies intentionally untracked files to ignore
└── README.md
```

### 7️⃣ Environment variables

```bash
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_WORKSPACES_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=
NEXT_PUBLIC_APPWRITE_MEMBERS_COLLECTION_ID=
NEXT_APPWRITE_KEY=
```
