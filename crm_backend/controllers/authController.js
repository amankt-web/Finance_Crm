
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Register new users
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({ username, email, password });
        const token = generateToken(newUser);
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login users
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout user (client-side will delete the token)
exports.logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};
