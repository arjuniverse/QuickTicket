# 🎫 QuickTicket - Online E-Ticket Booking System

A modern, frontend-focused web application for booking tickets to **movies, concerts, buses, and trains**. Built with **React and Vite**.

---

## 👤 Use Case Diagram

The use case diagram shows how a user interacts with the main features of QuickTicket.

```mermaid
flowchart LR

    U["👤 User"]

    subgraph QT["QuickTicket"]
        A(["Browse Events"])
        B(["View Event Details"])
        C(["Select Seats"])
        D(["Book Tickets"])
        E(["Generate E-Ticket"])
        F(["View My Bookings"])
        G(["Cancel Booking"])
    end

    U --- A
    U --- B
    U --- C
    U --- D
    U --- E
    U --- F
    U --- G
```

---

## ✨ Features

* 🎬 **Browse Events** - View movies, concerts, buses, and trains
* 🎫 **Event Details** - See date, time, venue, and pricing information
* 💺 **Seat Selection** - Interactive seat selection interface
* 📱 **E-Ticket Generation** - Automatic e-ticket with QR code
* 📋 **My Bookings** - View and manage all your bookings
* ❌ **Cancel Bookings** - Cancel upcoming bookings
* 💾 **Local Storage** - All data stored in browser localStorage

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to:

```text
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

---



## 🛠️ Technologies Used

* **React 18**
* **React Router DOM**
* **Vite**
* **QRCode.react**
* **CSS3**
* **Browser localStorage**

---

## 💾 Data Storage

QuickTicket uses browser **localStorage** to store booking information.

* Bookings persist across browser sessions
* No external database is required
* Booking information is stored locally
* QR codes contain booking information in JSON format

---

## 📝 Notes

* All bookings are stored in browser localStorage
* Data persists across browser sessions
* QR codes contain booking information in JSON format
* Maximum **10 seats** can be selected per booking

---

## 📄 License

This project is licensed under the **MIT License**.
