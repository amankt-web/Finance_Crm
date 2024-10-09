const express = require('express');
const router = express.Router();
const { getLeads, addLead, updateLead, deleteLead } = require('../controllers/leadController');

// GET all leads
router.get('/leads', getLeads);

// POST a new lead
router.post('/leads', addLead);

// PUT (update) a lead by ID
router.put('/leads/:id', updateLead);

// DELETE a lead by ID
router.delete('/leads/:id', deleteLead);

module.exports = router;
