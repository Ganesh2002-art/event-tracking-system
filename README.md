# Event Tracking System

A full-stack web application that captures browser events and processes them asynchronously using a queue system.

This project demonstrates scalable backend architecture using Node.js, Redis (BullMQ), MongoDB, and React.

---

## 🚀 Overview

This application:

- Captures user interactions (click events) from the browser
- Sends events to a backend API
- Pushes events into a Redis-backed queue
- Processes events asynchronously using a background worker
- Stores events in MongoDB
- Displays saved events in a table on the frontend

The system ensures that events are **not directly saved to the database**, but instead pass through a queue for proper decoupling and scalability.

---

## 🏗️ Architecture

Frontend → API → Redis Queue → Background Worker → MongoDB → Frontend Table

### Event Flow

1. User clicks on the page
2. React frontend sends event to backend
3. Backend pushes event to Redis queue
4. Worker consumes queue asynchronously
5. Worker stores event in MongoDB
6. Frontend fetches saved events and displays them

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Redis
- BullMQ (Queue system)

### Frontend
- React
- Axios

---

## 📂 Project Structure

event-tracking-system/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── models/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── queue/
│ │ ├── app.js
│ │ └── server.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ └── App.js
│ └── package.json
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Redis (v6+ recommended)

---

## 🔹 Backend Setup

Navigate to backend folder:

```bash
cd backend
npm install
Create .env file inside backend:

PORT=5000
MONGO_URI=mongodb://localhost:27017/event-tracker
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
Start the backend server:

node src/server.js
You should see:

MongoDB Connected
Server running on port 5000
🔹 Start Background Worker (Important)
In a separate terminal:

cd backend
node src/queue/worker.js
You should see:

Worker running...
This worker processes events from the queue and stores them in MongoDB.

🔹 Frontend Setup
Navigate to frontend folder:

cd frontend
npm install
npm start
Open:

http://localhost:3000
Click anywhere on the page to generate events.

📊 Example Event Data
{
  "type": "click",
  "metadata": {
    "x": 268,
    "y": 289
  },
  "createdAt": "2026-02-11T15:47:39.000Z"
}
🧠 Design Decisions
Events are not saved directly in the API layer.

All events pass through Redis queue.

Background worker handles persistence.

Separation of concerns between:

API layer

Queue layer

Worker layer

Database layer

Event retrieval limited and sorted by latest first.

📈 Scalability Considerations
Asynchronous processing reduces API latency.

Worker can be horizontally scaled.

Queue decouples ingestion from processing.

MongoDB schema ensures structured data storage.

🔐 Improvements (Future Enhancements)
Event throttling / debouncing

Pagination support

Retry mechanism in BullMQ

Dockerized setup

Authentication & rate limiting

Event batching

📧 Submission
Submitted as part of technical assessment.

👨‍💻 Author
Siva Naga Ganesh Babi Devana
