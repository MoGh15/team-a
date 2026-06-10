const mongoose = require('mongoose');
const AddressSchema = require('./Address');

const PatientSchema = new mongoose.Schema({
  userAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  address: AddressSchema,
  contactInfos: { type: Number },
  signature: { type: String },
  otp: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);