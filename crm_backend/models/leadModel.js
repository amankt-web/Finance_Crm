const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  PolicyName: { type: String, required: true },
  PolicyType: { type: String, required: true },
  ClassOfVehicle: { type: String, required: true },
  ProductType: { type: String, required: true },
  policyEndDate: { type: Date, required: true },
  mobileNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  policyStartDate: { type: Date, required: true },
  BookedIn: { type: String, required: true },
  AgentName: { type: String, required: true },
  InsuranceCompany: { type: String, required: true },
  Product: { type: String, required: true },
  PolicyNumber: { type: String, required: true },
  BusinnessType: { type: String, required: true },
  VehicleMake: { type: String, required: true },
  PolicyIssueDate: { type: Date, required: true },
  VehicleModel: { type: String, required: true },
  VehicleRegNo: { type: String, required: true },
  YearOFMFG: { type: String, required: true },
  GVW: { type: String, required: true },
  SumInsured: { type: String, required: true },
  NCB: { type: String, required: true },
  ODPremium: { type: String, required: true },
  TPPremimum: { type: String, required: true },
  Other: { type: String, required: true },
  NetPremimum: { type: String, required: true },
  GST: { type: String, required: true },
  FinalPremimum: { type: String, required: true },
  CutPay: { type: String, required: true },
  BalanceAmount: { type: String, required: true },
  PaymentMode: { type: String, required: true },
  CheckNumber: { type: String, required: true },
  Bank: { type: String, required: true },
  PORate: { type: String, required: true },
  POAmount: { type: String, required: true },
  TDSRate: { type: String, required: true },
  TDSAmount: { type: String, required: true },
  FinalPayableAmount: { type: String, required: true },
  CORate: { type: String, required: true },
  COAmount: { type: String, required: true }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
