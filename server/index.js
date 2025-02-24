const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
require('dotenv').config();
const morgan = require('morgan');
const tasksRouter = require('./routes/tasks');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://oneplan-amirulkanak.web.app',
// ];

const allowedOrigins = process.env.FRONTEND_URLS.split(',');

// Enable CORS for allowed origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).catch((err) => console.error(err));

// Firebase Admin Initialization
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Routes
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Oneplan Backend Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
