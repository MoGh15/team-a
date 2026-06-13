const Doctor = require('../models/Doctor');

exports.createDoctor = async (doctorData) => {
  return await Doctor.create(doctorData);
};

exports.getAllDoctors = async (filters = {}) => {
  return await Doctor.find(filters).populate('userAccountId');
};

exports.getDoctorById = async (doctorId) => {
  return await Doctor.findById(doctorId).populate('userAccountId');
};

exports.updateDoctorInfo = async (doctorId, updateData) => {
  return await Doctor.findByIdAndUpdate(doctorId, updateData, {
    new: true,
    runValidators: true
  });
};

exports.deleteDoctorProfile = async (doctorId) => {
  return await Doctor.findByIdAndDelete(doctorId);
};