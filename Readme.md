# TripForge AI

TripForge AI is a full-stack AI-powered travel booking platform that allows users to search, compare, and book flights and buses with secure payments, real-time notifications, AI-based recommendations, and instant e-ticket delivery.

## Live Demo

🔗 Live: https://trip-forge-ai-umber.vercel.app/  
🔗 GitHub: https://github.com/shoryanagarwal/TripForge_Ai

## Features

- Flight and bus search with real-time availability
- Secure JWT authentication
- OTP-based email verification
- Forgot password and reset password flow
- Razorpay payment gateway integration
- PDF ticket generation
- Email ticket delivery using Resend
- Real-time notifications using Socket.IO
- Booking cancellation with automatic seat restoration
- AI-powered travel recommendations using live database data
- Fully deployed frontend, backend, and database

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- Socket.IO

### Database
- PostgreSQL
- Neon PostgreSQL

### Integrations
- Razorpay
- Resend Email API
- Groq AI API

### Deployment
- Vercel
- Render
- Neon PostgreSQL

## System Flow

User → Frontend → Backend REST APIs → PostgreSQL Database

For AI recommendations:

User Input → Backend filters flights and buses from PostgreSQL → AI receives only live database results → Recommendation is returned to the user.

For payments:

Booking Created → Razorpay Order Created → Payment Completed → Signature Verified → Booking Confirmed → PDF Ticket Generated → Email + Notification Sent.

## Installation

### Clone the repository

```bash
git clone https://github.com/shoryanagarwal/TripForge_Ai.git
cd TripForge_Ai