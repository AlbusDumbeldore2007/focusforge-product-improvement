# FocusForge Productivity

FocusForge is a lightweight productivity application designed to help users manage their daily tasks and stay productive during their workday.

---

## Features

### Task Management
- Add new tasks
- View a list of existing tasks
- Mark tasks as completed with live status tracking

### Focus Timer & Daily Progress Tracker (Improved Feature)
Replaces the passive, disconnected legacy "Motivation Mode" widget with an active productivity hub:
- **Real-Time Progress Tracker:** Visual progress bar, percentage completion, and breakdown of Done / Pending / Total tasks.
- **Actionable Next Up:** Directly displays the next uncompleted task to eliminate decision fatigue.
- **Pomodoro Focus Timer:** 25-minute deep focus sessions and 5-minute restorative breaks with Start, Pause, and Reset controls.

For a full breakdown of the evaluation, architectural decisions, and changes, see [`Changes.md`](Changes.md).

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js with Express
- **Database:** PostgreSQL with Prisma ORM

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL running locally

---

### 1. Clone the Repository

```bash
git clone https://github.com/AlbusDumbeldore2007/focusforge-product-improvement.git
cd focusforge-product-improvement
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file by copying `.env.example` and update the `DATABASE_URL` with your PostgreSQL credentials:

```bash
cp .env.example .env
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Start the backend server:

```bash
npm run dev
# or
node index.js
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

In a new terminal window, navigate to the frontend directory:

```bash
cd client
npm install
npm run dev
```

The Vite dev server will start (typically at `http://localhost:5173`).

---

## Architectural & Product Improvements

See [`Changes.md`](Changes.md) for full documentation on:
- What Motivation Mode did
- Why it was ineffective
- The solution implemented
- Verification and testing results
