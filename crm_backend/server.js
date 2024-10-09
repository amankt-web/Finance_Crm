const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();
dotenv.config();

// Import routes
// const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/adminRoutes");
const dataRoutes = require("./routes/financeDataRoutes");
const leadRoutes = require("./routes/leadRoute");


//Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error", err);
    });

// Define routes
// app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);
app.use('/api',leadRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
