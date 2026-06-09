require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
const { initSocket } = require('./socket/socketManager');
const authRoutes = require('./routes/authRoutes');
const inboxRoutes = require('./routes/inboxRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const teamRoutes = require('./routes/teamRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const { initScheduler } = require('./cron/scheduler');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inbox', inboxRoutes);
app.use('/api/publisher', publisherRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/webhooks', webhookRoutes);

// Socket.io
initSocket(server);

// Cron jobs for scheduled posts
initScheduler();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 OmniDesk backend running on port ${PORT}`));
