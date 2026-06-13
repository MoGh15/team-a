// const Patient = require('../models/Patient');
// const MedicalData = require('../models/MedicalData');

// exports.submitIntakeForm = async (req, res) => {
//   try {
//     const { personalData, medicalHistory, signature, agreedToTerms } = req.body;

//     console.log('agreedToTerms:', agreedToTerms);
//     console.log('personalData:', personalData);

//     if (!agreedToTerms) {
//       return res.status(400).json({ message: 'You must agree to the clinic rules and privacy policy' });
//     }

//     const existingPatient = await Patient.findOne({ email: personalData.email });
//     if (existingPatient) {
//       return res.status(400).json({ message: 'Patient with this email already exists' });
//     }

//     const newPatient = await Patient.create({
//       name: personalData.name,
//       surname: personalData.surname,
//       email: personalData.email,
//       birthDate: personalData.dateOfBirth,
//       address: {
//         city: personalData.city,
//         street: personalData.street,
//         buildingNumber: personalData.buildingNumber,
//         apartNumber: personalData.apartNumber,
//         postCode: personalData.postCode
//       },
//       contactInfos: personalData.phone,
//       signature: signature
//     });

//     if (medicalHistory) {
//       await MedicalData.create({
//         patientId: newPatient._id,
//         symptoms: medicalHistory.symptoms || [],
//         allergies: medicalHistory.allergies || [],
//         operations: medicalHistory.operations || [],
//         chronicDiseases: medicalHistory.chronicDiseases || []
//       });
//     }

//     res.status(201).json({
//       message: 'Intake form and medical records submitted successfully.',
//       patientId: newPatient._id,
//       status: 'COMPLETED'
//     });

//   } catch (error) {
//     console.error('Submission Error:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

const patientService = require('../services/patientService');


exports.submitIntakeForm = async (req, res) => {
  try {
    const { personalData, medicalHistory, signature, agreedToTerms } = req.body;

    if (!agreedToTerms) {
      return res.status(400).json({ message: 'You must agree to the clinic rules and privacy policy' });
    }

    const newPatient = await patientService.createIntake(personalData, medicalHistory, signature);

    res.status(201).json({
      message: 'Intake form and medical records submitted successfully.',
      patientId: newPatient._id,
      status: 'COMPLETED'
    });

  } catch (error) {
    console.error('Submission Error:', error);
    if (error.message === 'Patient with this email already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.status(200).json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const data = await patientService.getPatientWithMedicalData(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await patientService.updatePatientInfo(req.params.id, req.body);
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ success: true, data: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await patientService.deletePatientAndData(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ success: true, message: 'Patient and associated medical data deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};