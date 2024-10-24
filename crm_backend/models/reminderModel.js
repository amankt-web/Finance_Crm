const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: Date,
    policyEndDate: Date,
    reminderDate: Date,
    reminderType: String, // Email or SMS
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'leads' },
    status: { type: String, default: 'pending' }, // pending, sent
});

module.exports = mongoose.model('Reminder', ReminderSchema);
