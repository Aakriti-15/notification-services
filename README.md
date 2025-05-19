# Notification Service

A notification service built with Node.js, Express, TypeScript, PostgreSQL (via Prisma), Redis + BullMQ for queuing, and supports:
- Email notifications (using Nodemailer/SendGrid)
- SMS notifications (using Twilio)
- In-app notifications stored in PostgreSQL
- Retry and monitoring with BullMQ and Bull Board

---
## How to Run Locally

### 1. Clone this repo
```bash
git clone https://github.com/Aakriti-15/notification-service.git
cd notification-service
---
## Tech Stack

- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- Redis + BullMQ
- Nodemailer / SendGrid (for Email)
- Twilio (for SMS)
- Bull Board (for job monitoring)

---
Create a .env file with these variables
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
---

## install dependencies
- npm install

##run the app
1.npm run dev
2.npm run worker
Open Bull Board in browser:
3.http://localhost:3000/admin/queues

---

## run prisma migrations
-> npx prisma migrate dev --name init

---
## Start the server and worker
open two terminal windows:
TERMINAL 1(API Server)
-> npx ts-node index.ts

TERMINAL 2(Worker)
-> npx ts-node worker.ts

---
# API endpoints
## POST / notifications
request body =
{
  "userId": 1,
  "type": "SMS",
  "content": "Your order has been shipped."
}
---
## GET /users/{id}/notifications
-> Returns a list of notifications for the specified user ID.

----
1. Postman docs - https://aakriti-7755804.postman.co/

---
## PROJECT STRUCTURE

.
├── index.ts                  // Sets up the Express server and API routes
├── notification.ts          // Logic for creating and retrieving notifications
├── notificationQueue.ts     // Creates and manages the BullMQ queue
├── notificationWorker.ts    // Processes jobs from the notification queue
├── worker.ts                // Initializes the worker
├── prismaClient.ts          // Prisma client instance
├── schema.prisma            // Prisma database schema

---
## Features

- Send Email, SMS, and In-App notifications
- Queue management using BullMQ
- Retry failed jobs with delay
- View and manage job status using Bull Board

---
## Assumptions Made

- PostgreSQL and Redis are running locally
- No authentication layer added (for demo simplicity)
- API consumer is responsible for sending correct data
- Retry and backoff behavior is configured using BullMQ






