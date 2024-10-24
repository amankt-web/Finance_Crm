const express = require('express');
const router = express.Router();
const {getPolicies,getReminders} = require("../controllers/reminderController");

router.get('/', getPolicies);
router.get('/reminders/:daysBefore', getReminders);

module.exports = router;