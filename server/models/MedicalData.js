const mongoose = require('mongoose');

const MedicalDataSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  symptoms: [{ type: String }],
  allergies: [{ type: String }],
  operations: [{ type: String }],
  chronicDiseases: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('MedicalData', MedicalDataSchema);