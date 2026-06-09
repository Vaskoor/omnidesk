# OmniDesk

OmniDesk is a full-stack social media management platform that enables users to manage multiple social media accounts, schedule posts, handle conversations, receive real-time notifications, and collaborate with team members from a single dashboard.

## Features

* Multi-platform social media integration
* User authentication and role-based access control (RBAC)
* Social account connection (Facebook, Instagram, TikTok, etc.)
* Post scheduling and publishing
* Unified inbox for messages and comments
* Real-time notifications using Socket.io
* Team collaboration and user management
* REST API backend
* Modern React frontend

---

## Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* JWT Authentication
* Socket.io

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/omnidesk.git
cd omnidesk
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/omnidesk
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173

# Facebook OAuth
FACEBOOK_APP_ID=your_fb_app_id
FACEBOOK_APP_SECRET=your_fb_secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/auth/facebook/callback

# Instagram OAuth
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_secret

# TikTok OAuth
TIKTOK_APP_ID=your_tiktok_app_id
TIKTOK_APP_SECRET=your_tiktok_secret
```

---

## Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

The Vite proxy automatically forwards API requests to:

```text
http://localhost:5000
```

---

## Project Structure

```text
omnidesk/
├── backend/
│   ├── config/          # Database & Passport configuration
│   ├── controllers/     # Route controllers
│   ├── cron/            # Scheduled jobs and post publishing
│   ├── middleware/      # Authentication & RBAC
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── services/        # Platform integrations & webhooks
│   ├── socket/          # Socket.io configuration
│   ├── utils/           # Utility functions
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # UI components
    │   ├── hooks/       # Custom React hooks
    │   ├── services/    # API & Socket services
    │   ├── slices/      # Redux Toolkit slices
    │   ├── store/       # Redux store
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Available Scripts

### Backend

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

---

### Frontend

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## API Testing

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name":"Admin",
  "email":"admin@example.com",
  "password":"123456",
  "role":"admin"
}'
```

### Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email":"admin@example.com",
  "password":"123456"
}'
```

---

## Authentication

OmniDesk supports:

* JWT Authentication
* Role-Based Access Control (RBAC)
* Facebook OAuth
* Instagram OAuth
* TikTok OAuth

Additional social providers can be added through Passport.js strategies.

---

## Real-Time Features

Powered by Socket.io:

* Live messaging
* Real-time notifications
* Team activity updates
* Instant dashboard synchronization

---

## Deployment

### Backend

```bash
npm install
npm start
```

### Frontend

```bash
npm install
npm run build
```

Deploy the generated `dist/` folder to your preferred hosting provider.

---

## Docker Support

Docker support can be added using a `docker-compose.yml` file to run:

* Frontend
* Backend
* MongoDB

within a single containerized environment.

---

## Future Enhancements

* Analytics Dashboard
* AI Content Suggestions
* Multi-Workspace Support
* Social Media Listening
* Mobile Application
* Advanced Team Permissions
* Automated Reporting

---

## License

MIT License

---

## Author

Developed for managing social media operations efficiently through a centralized platform.
