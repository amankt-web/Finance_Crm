const Lead = require('../models/leadModel');
const moment = require('moment');
const multer = require('multer');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for PDF uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create unique file name
  }
});
const upload = multer({ storage: storage });

// @desc Get all active leads (not soft-deleted)
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ isDeleted: false });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all soft-deleted leads (recycle bin)
exports.getDeletedLeads = async (req, res) => {
  try {
    const deletedLeads = await Lead.find({ isDeleted: true });
    res.status(200).json(deletedLeads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Bulk add leads (with date formatting)
exports.bulkAddLeads = async (req, res) => {
  try {
    const leads = req.body;

    const cleanedLeads = leads.map((lead) => {
      if (lead.PolicyStartDate) {
        lead.PolicyStartDate = moment(lead.PolicyStartDate, 'DD-MM-YYYY').toDate();
      }
      if (lead.policyEndDate) {
        lead.policyEndDate = moment(lead.PolicyEndDate, 'DD-MM-YYYY').toDate();
      }
      if (lead.PolicyIssueDate) {
        lead.PolicyIssueDate = moment(lead.PolicyIssueDate, 'DD-MM-YYYY').toDate();
      }
      return lead;
    });

    await Lead.insertMany(cleanedLeads);
    res.status(200).send({ message: 'Leads imported successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to import leads' });
  }
};

// @desc Add a new lead
exports.addLead = async (req, res) => {
  const newLeadData = req.body;

  try {
    const newLead = new Lead({
      ...newLeadData,
      isDeleted: false,  // Initialize with not deleted
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a lead by ID
exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Soft delete a lead (move to recycle bin)
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead moved to recycle bin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Restore a lead from the recycle bin
exports.restoreLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Permanently delete a lead by ID
exports.permanentlyDeleteLead = async (req, res) => {
  try {
    // Find and delete the lead by ID
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Upload a PDF and associate it with a lead
exports.uploadPDF = [
  upload.single('pdfFile'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      const filePath = req.file.path;

      // Optionally, you can update the lead with the file path in the database
      // Assuming a 'leadId' is passed in the request body to associate the file with a specific lead
      const { leadId } = req.body;
      if (leadId) {
        await Lead.findByIdAndUpdate(leadId, { pdfFilePath: filePath });
      }

      res.json({ filePath, message: 'PDF uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload PDF' });
    }
  }
];
