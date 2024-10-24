const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin can create a user (by name, email, and password)
// Admin can create a user (by name, email, and password)
exports.createUser = async (req, res) => {
    console.log(req.body); // Check incoming request data
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error during user creation:', err); // Log the error
        res.status(400).json({ message: 'Error creating user', error: err.message });
    }
};


// Admin can update a user
exports.updateUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure fields if needed

        // Validate input if necessary
        if (email) {
            // Check if email already exists for a different user
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        // Hash the password if it's being updated
        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error updating user' });
    }
};

// Admin can delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).json({ message: 'User deleted' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error deleting user' });
    }
};

// Admin can get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users); // Return the users in the response
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error fetching users' });
    }

    
};

exports.getUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Include role in the token
            process.env.JWT_SECRET, // Use secret from .env file
            { expiresIn: '1d' }
        );

        res.status(200).json({ token }); // Return the token
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error fetching user' });
    }
};



exports.loginAsUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a token for the user
        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error logging in as user' });
    }
};

exports.adminLoginAsUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate JWT token for the user
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: 'user' }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiration time
        );

        res.status(200).json({ token }); // Send the token as a response
    } catch (err) {
        console.error('Error during admin login as user:', err); // Log the error for better diagnosis
        res.status(500).json({ message: 'Error logging in as user' });
    }
};

