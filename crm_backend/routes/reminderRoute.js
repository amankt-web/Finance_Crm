const express = require('express');
const router = express.Router();
const {getPolicies,getReminders,intervalReminder,reminders} = require("../controllers/reminderController");

router.get('/', getPolicies);
router.get('/reminders/:daysBefore', getReminders);
router.get('/reminders/interval',intervalReminder)
router.get('/reminders',reminders)

module.exports = router;