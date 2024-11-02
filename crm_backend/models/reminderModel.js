const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  name: String,
  PolicyNumber: String,
  PolicyStartDate: Date,
  policyEndDate: Date,
});

module.exports = mongoose.model('Policy', PolicySchema);
