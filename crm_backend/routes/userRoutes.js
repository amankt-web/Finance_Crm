// In userRoutes.js
const express = require('express');
const {
    createUser,
    updateUser,
    deleteUser,
    getUsers, getUserById,adminLoginAsUser,getUser// Import the getUsers function
} = require('../controllers/userController');
const { authenticateToken, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin can create, update, delete, and get users
router.post('/', authenticateToken, adminOnly, createUser);       // Create user
router.put('/:id', authenticateToken, adminOnly, updateUser);     // Update user
router.delete('/:id', authenticateToken, adminOnly, deleteUser);  // Delete user
router.get('/', authenticateToken, adminOnly, getUsers);  
router.post('/login', getUser);
router.get('/:id', authenticateToken, adminOnly, getUserById); // Get user by ID
router.post('/login-as-user/:id', authenticateToken, adminOnly, adminLoginAsUser); // New route to log in as a user

module.exports = router;
