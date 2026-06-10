const mongoose = require('mongoose');
const AddressSchema = require('./Address');
const { Specializations, DaysOfWeek } = require('./Enums');

const WorkingHoursSchema = new mongoose.Schema({
  workDays: [{ type: String, enum: DaysOfWeek }],
  startTime: { type: String, required: true }, // Example: "08:00"
  endTime: { type: String, required: true }    // Example: "16:00"
}, { _id: false });

const DoctorSchema = new mongoose.Schema({
  userAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  name: { type: String, required: true },
  surname: { type: String, required: true },
  specialization: { type: String, enum: Specializations, required: true },
  email: { type: String, required: true, unique: true },
  address: AddressSchema,
  contactInfos: { type: Number },
  workingHours: WorkingHoursSchema,
  signature: { type: String }, 
  otp: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);