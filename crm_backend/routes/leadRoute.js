const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const multer = require('multer');

// Multer setup for PDF file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for PDF uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create unique file name
  }
});
const upload = multer({ storage: storage });

// Route to get all active leads (non-deleted)
router.get('/', leadController.getLeads);

// Route to get all soft-deleted leads (recycle bin)
router.get('/deleted', leadController.getDeletedLeads);

// Route to bulk add leads with date formatting
router.post('/bulk', leadController.bulkAddLeads);

// Route to add a new lead
router.post('/', leadController.addLead);

// Route to update an existing lead by ID
router.put('/:id', leadController.updateLead);

// Route to soft-delete a lead by ID (move to recycle bin)
router.patch('/:id/delete', leadController.deleteLead);

// Route to restore a lead from the recycle bin by ID
router.patch('/:id/restore', leadController.restoreLead);

// Route to permanently delete a lead by ID
router.delete('/:id', leadController.permanentlyDeleteLead);

// Route to upload PDF associated with a lead
router.post('/:id/upload', upload.single('pdf'), (req, res) => {
  // Add logic to handle the uploaded PDF (store PDF info in database, etc.)
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = router;
