const doctorService = require('../services/doctorService');


exports.createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors(req.query);
    res.status(200).json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await doctorService.updateDoctorInfo(req.params.id, req.body);
    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }
    res.status(200).json({ success: true, data: updatedDoctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await doctorService.deleteDoctorProfile(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }
    res.status(200).json({ success: true, message: 'Doctor profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};