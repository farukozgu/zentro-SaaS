# Zentro — Modern Task Management SaaS  
A clean, responsive, and smooth task management web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.  
Zentro helps you organize your tasks, track progress, and stay productive with beautiful design and seamless user experience.

---

## 🚀 Features

- ✔ **Create / View / Edit / Delete Tasks**
- 🎯 **Priority Levels** (Low / Medium / High)
- 📌 **Task Statuses** (Todo, In Progress, Done)
- 📅 **Deadlines + Overdue Highlighting**
- 🔍 **Global Search**
- 🎛 **Multi-filtering** (priority + status)
- 🗂 **List + Kanban Board Views**
- 📊 **Analytics Dashboard**
- 🌗 **Light / Dark Theme Toggle**
- 💾 **LocalStorage Persistence**
- ✨ **Framer Motion Animations**
- 🍞 **Toast Notifications**

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React + TypeScript** | Core app architecture |
| **React Router** | Multi-page navigation |
| **Tailwind CSS** | Utility-first modern styling |
| **Framer Motion** | Smooth page & UI animations |
| **LocalStorage** | Client-side data persistence |
| **ESLint + Prettier** | Code formatting & linting |

---

# 📸 Screenshots

Below is a curated preview of Zentro in both **light** and **dark** themes.

---

## 📊 Dashboard (Light & Dark)

<div align="center">
  <img src="/screenshots/dashboard-light.png" width="48%" />
  <img src="/screenshots/dashboard-dark.png" width="48%" />
</div>

---

## 🗂 Kanban Board

<div align="center">
  <img src="/screenshots/board-dark.png" width="90%" />
</div>

---

## ➕ Create New Task

<div align="center">
  <img src="/screenshots/newtask-dark.png" width="90%" />
</div>

---

## 📄 Task Detail

<div align="center">
  <img src="/screenshots/taskdetail-dark.png" width="90%" />
</div>

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/farukozgu/zentro-SaaS
cd zentro-SaaS
npm install
npm run dev

# Structure
src/
 ├─ components/        # UI components
 ├─ pages/             # Page-level components
 ├─ context/           # Global state (TasksContext & ToastContext)
 ├─ hooks/             # Custom hooks
 ├─ types/             # TypeScript type definitions
 ├─ router/            # React Router config
 └─ styles/            # Global styles

# 🔮 Possible Future Improvements

🔐 Authentication (Supabase / Firebase)
🏷 Custom tags + sub-tasks
🌀 Drag & Drop Kanban
📈 Activity timeline
☁ Cloud sync

# 📜 License
MIT License © 2025
