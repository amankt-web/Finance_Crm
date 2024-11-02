const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' } // User linked to agent
});

module.exports = mongoose.model('User', userSchema);
