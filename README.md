# Bank Management System API

A secure and scalable banking backend built using Node.js, Express.js, MongoDB, and JWT Authentication.

---

## 🌟 Overview

**SecureVault** is a comprehensive full-stack banking web application designed to handle secure user authentication, account management, core banking operations (Deposits, Withdrawals, and P2P Transfers), real-time transaction tracking, and **automated background email notifications**. 

---

## ✨ Key Features

* **🔒 Secure Authentication:** User registration, PIN/Password-protected logins, and token/session validation.
* **💰 Core Banking Operations:**
  * Instant **Deposits** with live account balance synchronization.
  * Secure **Withdrawals** with sufficient balance verification.
  * Peer-to-Peer **Fund Transfers** using unique destination account numbers.
* **📧 Automated Email Alerts:** Integrated background task processing (`BackgroundTasks`) to instantly notify users via email for every deposit, withdrawal, or transfer.
* **📜 Transaction History:** Real-time log tracking of all past financial activities and movements.
* **💎 Modern UI/UX:** Built with Next.js App Router, Tailwind CSS, and custom glassmorphism design elements featuring smooth toast notifications (`react-hot-toast`).

---



---

## 🛠️ Tech Stack

### **Backend**
* **Python & FastAPI** - High-performance async REST API framework.
* **Uvicorn** - ASGI server implementation.
* **Pydantic** - Data validation and settings management.

### **Frontend**
* **Next.js (React)** - Modern framework for production-grade web apps.
* **Tailwind CSS** - Utility-first styling for gorgeous responsive interfaces.
* **React Hot Toast** - Sleek popup notifications for user feedback.

---

## Project Status

🚧 Under Development
