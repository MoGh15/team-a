const Patient = require('../models/Patient');
const MedicalData = require('../models/MedicalData');


exports.createIntake = async (personalData, medicalHistory, signature) => {
  
  const existingPatient = await Patient.findOne({ email: personalData.email });
  if (existingPatient) {
    throw new Error('Patient with this email already exists');
  }

  
  const newPatient = await Patient.create({
    name: personalData.name,
    surname: personalData.surname,
    email: personalData.email,
    birthDate: personalData.dateOfBirth,
    address: {
      city: personalData.city,
      street: personalData.street,
      buildingNumber: personalData.buildingNumber,
      apartNumber: personalData.apartNumber,
      postCode: personalData.postCode
    },
    contactInfos: personalData.phone,
    signature: signature
  });


  if (medicalHistory) {
    await MedicalData.create({
      patientId: newPatient._id,
      symptoms: medicalHistory.symptoms || [],
      allergies: medicalHistory.allergies || [],
      operations: medicalHistory.operations || [],
      chronicDiseases: medicalHistory.chronicDiseases || []
    });
  }

  return newPatient;
};


exports.getAllPatients = async () => {
  return await Patient.find();
};


exports.getPatientWithMedicalData = async (patientId) => {
  const patient = await Patient.findById(patientId);
  if (!patient) return null;

  const medicalData = await MedicalData.findOne({ patientId: patient._id });
  return { personalInfo: patient, medicalHistory: medicalData };
};


exports.updatePatientInfo = async (patientId, updateData) => {
  return await Patient.findByIdAndUpdate(patientId, updateData, {
    new: true,
    runValidators: true
  });
};


exports.deletePatientAndData = async (patientId) => {
  const patient = await Patient.findByIdAndDelete(patientId);
  if (!patient) return null;


  await MedicalData.deleteMany({ patientId: patientId });
  return patient;
};