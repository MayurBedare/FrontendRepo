# ⚡ AI Knowledge Hub – Frontend

This is the frontend for **AI Knowledge Hub**, a modern knowledge sharing platform built using **React + Vite**.

It provides a clean, responsive UI where users can:

* Register and log in
* Create and manage articles
* Improve content using AI
* Explore technical articles shared by others

The focus of this frontend is performance, clean design, and smooth user experience.

---

# 🚀 1. Approach & Architecture

## 🏗 Component-Based Design

* **React 18 + Vite** → Fast development and optimized production builds
* **Context API** → Used for authentication and user session management
* **Protected Routes** → Only logged-in users can access dashboard and article creation pages

The application is structured in small, reusable components to keep the code clean and maintainable.

---

## 🎨 UI & Design

* **Glassmorphism Style** → Used backdrop blur, soft gradients, and transparent cards
* **Custom CSS Animations** → Smooth transitions for modals, toasts, and page changes
* **Lucide Icons** → Lightweight and consistent icon design
* **Responsive Layout** → Works on desktop and tablet screens

All styling is done using **Vanilla CSS**, without heavy UI libraries.

---

# 📂 2. Folder Structure

```
src/
├── components/
│   └── Navbar.jsx       → Navigation bar with logout & toast logic
├── pages/
│   ├── Home.jsx           → Displays all public articles
│   ├── ArticleDetail.jsx  → Shows full article content
│   ├── CreateArticle.jsx  → AI-powered content editor
│   ├── EditArticle.jsx    → Update existing article
│   ├── Dashboard.jsx      → User’s personal articles
│   ├── Login.jsx          → User authentication
│   └── Register.jsx       → User registration
├── context/
│   └── AuthContext.jsx    → Manages JWT token and user session
├── utils/
│   └── api.js             → Axios configuration
└── index.css              → Global styles and animations
```

This structure helps separate UI, logic, and API handling clearly.

---

# 🤖 3. AI Integration in Frontend

The frontend integrates with backend AI endpoints to provide:

* **Improve with AI** → Enhances article quality
* **AI Tag Suggestions** → Suggests relevant technical tags

AI was used during development for:

* Initial component scaffolding
* Improving modal logic
* Debugging UI state issues

All components were manually refined for styling, responsiveness, and proper state handling.

---

# 🛠️ 4. Setup Instructions

## ✅ Prerequisites

* Node.js (v18+)
* Backend running at `http://localhost:5000`

---

## ▶ Installation

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5174
```

---

# 🎥 5. Demo

Demo Link:
[https://drive.google.com/file/d/1ubV9CX3EkKOD1o5HMLPkun9emjzmtdRZ/view?usp=sharing](https://drive.google.com/file/d/1ubV9CX3EkKOD1o5HMLPkun9emjzmtdRZ/view?usp=sharing)

The demo includes:

* User Signup & Login
* JWT-based authentication
* Article creation & editing
* AI-powered content improvement
* Responsive UI behavior

---

# 📌 6. What This Frontend Demonstrates

* Strong understanding of React fundamentals
* Clean state management using Context API
* Protected routing logic
* Custom CSS design system
* Practical AI feature integration
* Modular and maintainable code structure

---

# 👨‍💻 Project Summary

This frontend showcases how a modern React application can integrate AI-assisted workflows while maintaining clean UI design, secure authentication flow, and good performance.
