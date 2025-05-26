# 🛒 Grocify - React Native

Grocify is a Blinkit-inspired grocery delivery app built using **React Native** for the frontend and **Express.js + MongoDB** for the backend. It supports features like real-time product listing, cart management, and order placement.

---

## 📱 Features

### 🧑 User
- Signup/Login
- View categorized products
- Add items to cart
- Modify cart (add/remove items)
- Place orders
- Track order status (basic)

### 👨‍🍳 Admin
- Add/Edit/Delete products
- Manage categories
- View orders placed by users

---

## 🛠 Tech Stack

### Frontend (React Native)
- `React Native CLI`
- `Zustand` (State Management)
- `React Navigation`
- `Axios`
- `AsyncStorage`

### Backend (Express)
- `Express.js`
- `MongoDB` with `Mongoose`
- `JWT` for Auth
- `Bcrypt` for password hashing
- `CORS` and `Body-parser`

---

## 📁 Folder Structure

```bash
Blinket/
├── client/                # React Native App
│   ├── components/
│   ├── screens/
│   ├── store/             # Zustand state files
│   └── utils/             # API helpers, etc.
├── server/                # Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
└── README.md
