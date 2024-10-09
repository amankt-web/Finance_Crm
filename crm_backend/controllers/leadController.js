const Lead = require('../models/leadModel');

// @desc Get all leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new lead
exports.addLead = async (req, res) => {
  const {
    name, PolicyName, PolicyType, ClassOfVehicle, ProductType, policyEndDate, mobileNumber, 
    vehicleType, policyStartDate, BookedIn, AgentName, InsuranceCompany, Product, PolicyNumber,
    BusinnessType, VehicleMake, PolicyIssueDate, VehicleModel, VehicleRegNo, YearOFMFG, GVW, 
    SumInsured, NCB, ODPremium, TPPremimum, Other, NetPremimum, GST, FinalPremimum, CutPay, 
    BalanceAmount, PaymentMode, CheckNumber, Bank, PORate, POAmount, TDSRate, TDSAmount, 
    FinalPayableAmount, CORate, COAmount 
  } = req.body;

  try {
    const newLead = new Lead({
      name, PolicyName, PolicyType, ClassOfVehicle, ProductType, policyEndDate, mobileNumber, 
      vehicleType, policyStartDate, BookedIn, AgentName, InsuranceCompany, Product, PolicyNumber,
      BusinnessType, VehicleMake, PolicyIssueDate, VehicleModel, VehicleRegNo, YearOFMFG, GVW, 
      SumInsured, NCB, ODPremium, TPPremimum, Other, NetPremimum, GST, FinalPremimum, CutPay, 
      BalanceAmount, PaymentMode, CheckNumber, Bank, PORate, POAmount, TDSRate, TDSAmount, 
      FinalPayableAmount, CORate, COAmount
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

// @desc Delete a lead by ID
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
