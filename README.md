# 🗨️ 2kai — Minimal Web Chat App

**2kai** is a lightweight web chat application built with **Node.js + Express** on the backend and **vanilla HTML, CSS, and JavaScript** on the frontend.  
It demonstrates key web development concepts, including user authentication, real-time messaging (via polling), responsive design, and local data storage using JSON files.

---

## ✨ Features

- 🔐 **User Authentication** — register and log in with unique accounts  
- 💬 **Direct Messaging** — chat with other users in real-time  
- 📂 **Chat List Management** — track recent chats and unread messages  
- 📱 **Responsive Design** — optimized for desktop and mobile layouts  
- 🔔 **Notifications** — visual pop-ups for new messages  
- 💾 **File-Based Storage** — users and messages stored locally in `users.json` and `messages.json`  

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend  | HTML, CSS, Vanilla JS |
| Backend   | Node.js, Express |
| Storage   | JSON files (`users.json`, `messages.json`) |

---

## ⚙️ Setup Instructions

1. **Clone the repository and install dependencies:**

```git clone https://github.com/<yourusername>/2kai.git
cd 2kai
npm install
```

2. **Start the server:**

```npm start```

3. **Open it in your browser (! it is local !)**

```http://localhost:3000```

## ⚠️ Important Notes 

- This project is for educational purposes and demonstration only.

- Passwords are stored in plain text — for production, always use hashing (e.g., bcrypt) and HTTPS.

- Chat updates are implemented using polling every second, not WebSockets.

- Designed to illustrate core programming concepts:

-Frontend-backend communication via HTTP

- Asynchronous requests with fetch()

- File-based persistence

- Responsive UI design and DOM manipulation
