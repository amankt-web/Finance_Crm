// In your policyController.js
const Lead = require('../models/leadModel');
const moment = require('moment');
const dayjs = require('dayjs');
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Lead.find({}, 'Name PolicyNumber PolicyStartDate policyEndDate status');
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reminder logic in policyController.js




// Assuming your getReminders function looks something like this
exports.getReminders = async (req, res) => {
    const daysBefore = parseInt(req.params.daysBefore);
    const today = dayjs(); // Use dayjs to get the current date
    const reminderDate = today.add(daysBefore, 'day').endOf('day'); // Add days to current date
  try {
    
    
    // Fetch leads with policyEndDate close to the reminderDate
    const leads = await Lead.find({
      policyEndDate: { $lte: reminderDate.toDate() },
    });
    
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

