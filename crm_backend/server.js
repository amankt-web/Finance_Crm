const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

const app = express();
dotenv.config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoute");
const policyRoutes = require("./routes/reminderRoute");
const agentRoutes = require("./routes/agentRoutes");
const reminderRoutes = require("./routes/reminderRoute");
const graphRoutes = require("./routes/graphRoute");

// Middleware
const allowedOrigins = ['http://localhost:4200'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());  // To parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error", err);
    });

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);  // Updated to have clear route paths
app.use('/api/policies', policyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/reminder', reminderRoutes);
app.use('/api',graphRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
