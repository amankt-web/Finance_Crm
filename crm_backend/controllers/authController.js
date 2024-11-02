const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Admin Login
exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    // Load the admin credentials from environment variables
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Set this in your .env file
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Set this in your .env file

    // Check if email and password match the admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate JWT token
        const token = jwt.sign({ email: ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token });
    } else {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
};
