const mongoose = require('mongoose');
const AddressSchema = require('./Address');

const AdminSchema = new mongoose.Schema({
  userAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  specialization: { type: String }, 
  email: { type: String, required: true, unique: true },
  address: AddressSchema,
  contactInfos: { type: Number },
  signature: { type: String },
  otp: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);