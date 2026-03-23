# Personalized TODO Tracker

A full-stack task management application featuring user authentication, persistent storage, and a responsive React interface.

---

## 🚀 Features
* **Secure Authentication:** Implementation of **JSON Web Tokens (JWT)** for user sessions.
* **Persistent Storage:** Integrated with **MongoDB** to ensure tasks are saved across sessions.
* **Full CRUD Functionality:** Create, Read, and Delete TODOs with ease.
* **Global State Management:** Utilizes **React Context API** (`AuthContext`) to handle login states across the app.
* **Component-Based UI:** Modular architecture using `LoggedInHome`, `Todos`, and `CreateTODO` components.

## 🛠️ Tech Stack
* **Frontend:** React.js
* **Backend:** Node.js & Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JWT (Tokens stored in `localStorage` as `todoToken`)

## 📂 Project Structure
```text
├── client/                # React Application
│   ├── src/
│   │   ├── components/    # UI Components (CreateTODO, Todos, etc.)
│   │   ├── context/       # AuthContext for global user state
│   │   └── App.js         # Main entry and Routing
├── server/                # Express Backend
│   ├── routes/            # API Endpoints (/addtodo, /todos, /removetodo, /verify)
│   ├── models/            # Mongoose Schemas for User and Todo
│   ├── db.js              # Database connection configuration
│   └── index.js           # Server entry point
└── .env                   # Environment variables (Ignored by Git)