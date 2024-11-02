const mongoose = require('mongoose');


// Check if the model is already compiled to avoid OverwriteModelError
const Lead = mongoose.models.Lead || mongoose.model('Lead', new mongoose.Schema({
  Name: String,
  PolicyName: String,
  PolicyType: String,
  ClassOfVehicle: String,
  ProductType: String,
  policyEndDate: Date,
  mobileNumber: String,
  vehicleType: String,
  PolicyStartDate: Date,
  BookedIn: String,
  AgentName: String,
  InsuranceCompany: String,
  Product: String,
  PolicyNumber: String,
  BusinnessType: String,
  VehicleMake: String,
  PolicyIssueDate: Date,
  VehicleModel: String,
  VehicleRegNo: String,
  YearOFMFG: String,
  GVW: String,
  SumInsured: String,
  NCB: String,
  ODPremium: String,
  TPPremimum: String,
  Other: String,
  NetPremimum: String,
  GST: String,
  FinalPremimum: String,
  CutPay: String,
  BalanceAmount: String,
  PaymentMode: String,
  CheckNumber: String,
  Bank: String,
  PORate: String,
  POAmount: String,
  TDSRate: String,
  TDSAmount: String,
  FinalPayableAmount: String,
  CORate: String,
  COAmount: String,
  pdfFile: {
    type: String, // Store the file path or URL
    required: false,
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true }));

module.exports = Lead;
