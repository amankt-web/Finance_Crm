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


exports.reminders = async(req,res)=>{
    try {
        const leads = await Lead.find();
    const updatedLeads = leads.map((lead)=>{
        lead = lead.toObject();
        lead.status = getPolicyStatus(lead.policyEndDate);
        return lead;
    });
    res.status(200).json(updatedLeads);
        
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the leads"});
    }
};

exports.intervalReminder = async(req, res) =>{
    const interval = parseInt(req.params.interval, 10);//2, 14 or 30 days 
    const now = new Date();

    const reminderThresholdDate = new Date(now.setDate(now.getDate() + interval));

    try {
        const leads = await Lead.find();

    // Filter leads with a policy end date within the specified interval
    const filteredLeads = leads.filter((lead) => {
      const policyEndDate = new Date(lead.policyEndDate);
      return policyEndDate <= reminderThresholdDate;
    }).map((lead) => {
      // Add a status field to each lead object
      lead = lead.toObject(); // Convert Mongoose document to a plain object
      lead.status = getPolicyStatus(lead.policyEndDate);
      return lead;
    });

    res.status(200).json(filteredLeads);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leads for reminders' });
    }
};

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

