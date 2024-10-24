const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware for protecting routes
exports.authenticateToken = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user information in the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalid' });
    }
};

// Admin-only middleware
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Proceed if user is admin
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};



