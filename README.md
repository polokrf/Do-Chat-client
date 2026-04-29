# 💬 DoChat — Real-Time Social Chat Platform

![Banner](https://i.ibb.co.com/vCXYQzS9/chat-App-34.png)

---

## 📌 Project Overview

- A full-stack real-time social chat platform  
- Secure user registration and authentication system  
- Search users and build social connections  
- Send, cancel, and manage friend requests  
- Real-time one-to-one communication  
- Handles duplicate requests and Socket.IO reconnection issues  
- Focused on secure, scalable, and smooth user experience  

👉 **Main goal:** Build meaningful real-time social connections with secure communication  

---

## 🌐 Live Website

- 🔗 https://do-chat-client.vercel.app/

---

## 🚀 Key Features

- 🔐 Secure user registration & login  
- 👤 Search users easily  
- ➕ Add friend system  
- ❌ Cancel friend request  
- 🚫 Unfriend functionality  
- 💬 Real-time one-to-one chat  
- 🟢 Active/online status  
- ⌨️ Typing indicator  
- 📜 Scroll pagination for chat history  
- 🔔 Real-time notifications  
  - Friend request sent  
  - Friend request accepted  
- 🔄 Socket.IO reconnection recovery  
- 🛡️ JWT + NextAuth security system  
- 📱 Fully responsive UI  

---

## 🧠 Problems Solved

### 🔁 Duplicate Friend Request Issue
Users sometimes clicked the friend request button multiple times, causing duplicate requests.  

**Solution:**  
- Backend unique validation  
- Frontend button disabling  
- Duplicate notification prevention  

### 🔌 Socket Reconnection Issue
Sometimes users disconnected due to network issues, and reconnecting failed to restore active status properly.  

**Solution:**  
- Automatic socket re-registration  
- Active status recovery  
- Improved backend event handling  

### 🔐 Security Enhancement
**Backend:** JWT authentication for protected routes  
**Frontend:** NextAuth + Proxy security + Protected dashboard routes  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- Next.js  
- Tailwind CSS  
- DaisyUI  

### ⚙️ Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT  

### 🔄 Data & State Management
- TanStack Query  
- Axios  

### 🔐 Authentication & Real-Time
- NextAuth  
- Socket.IO  

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/DoChat.git
cd DoChat
npm install
npm run dev
