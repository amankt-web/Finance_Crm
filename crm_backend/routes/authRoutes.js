const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Admin login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if provided credentials match those stored in .env
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Generate JWT token for the admin
        const token = jwt.sign({ email: process.env.ADMIN_EMAIL, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.json({ token });
    } else {
        return res.status(403).json({ message: 'Invalid admin credentials' });
    }
});

module.exports = router;
