const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ✅ Removed AddressSchema dependency to keep this self-contained
// Add it back if you have the Address model
const AdminSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  specialization: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfos: { type: String },
  role: { type: String, enum: ['Admin'], default: 'Admin' },
  signature: { type: String },
  otp: { type: String }
}, { timestamps: true });

// ✅ Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ✅ Compare password method
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);