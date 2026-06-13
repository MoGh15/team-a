import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PersonalData from '../components/personal-data/PersonalData';
import { useNavigate } from 'react-router-dom';
import { Specializations } from '../utils/enums';

const PatientPortal = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState('personal');
  const fileInputRef = useRef(null);
  const sigCanvasRef = useRef(null);

  const [personalData, setPersonalData] = useState({
    name: '', surname: '', email: '', phone: '', dateOfBirth: '',
    city: '', street: '', buildingNumber: '', apartNumber: '', postCode: ''
  });

  const [medicalHistory, setMedicalHistory] = useState({
    specialization: '', currentSickness: '', allergies: '',
    medicaments: '', previousIllnesses: '', symptoms: ''
  });

  const [files, setFiles] = useState([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicalChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      return alert("You must agree to the clinic rules and privacy policy.");
    }

    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      return alert("Please provide your signature before submitting.");
    }

    let signatureBase64;
    try {
      const sigPad = sigCanvasRef.current.getSignaturePad();
      signatureBase64 = sigPad.toDataURL('image/png');
    } catch (err) {
      console.error("Signature extraction error:", err);
      return alert("Failed to read signature. Please try drawing again.");
    }

    const parsedApartNumber = parseInt(personalData.apartNumber, 10);

    // ✅ Always send plain JSON — no FormData, no multer needed
    const payload = {
      personalData: {
        name: personalData.name,
        surname: personalData.surname,
        email: personalData.email,
        dateOfBirth: personalData.dateOfBirth,
        city: personalData.city,
        street: personalData.street,
        buildingNumber: personalData.buildingNumber,
        apartNumber: isNaN(parsedApartNumber) ? undefined : parsedApartNumber,
        postCode: personalData.postCode,
        phone: personalData.phone
      },
      medicalHistory: {
        specialization: medicalHistory.specialization,
        symptoms: medicalHistory.symptoms ? [medicalHistory.symptoms] : [],
        allergies: medicalHistory.allergies ? [medicalHistory.allergies] : [],
        operations: medicalHistory.previousIllnesses ? [medicalHistory.previousIllnesses] : [],
        chronicDiseases: medicalHistory.currentSickness ? [medicalHistory.currentSickness] : []
      },
      signature: signatureBase64,
      agreedToTerms: true
    };

    try {
      const response = await fetch('http://localhost:5004/api/patients/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Success: Profile, signature, and documents submitted successfully!");
        navigate('/')
      } else {
        alert(`Error: ${result.message || "Validation failed"}`);
        console.error("Server validation errors:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to the server.");
    }
  };

  const steps = [
    { id: 'personal', label: 'Personal Data', icon: '👤' },
    { id: 'specialization', label: 'Choose Specialization', icon: '🏥' },
    { id: 'medical', label: 'Medical History', icon: '⚕️' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'submission', label: 'Agreement & Submit', icon: '✍️' }
  ];

  const specsList = Object.values(Specializations);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Patient Registration</h1>
          <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeStep === step.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-2">{step.icon}</span>{step.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-transparent">
          {activeStep === 'personal' && (
            <PersonalData
              formData={personalData}
              handlePersonalChange={handlePersonalChange}
            />
          )}

          {activeStep === 'specialization' && (
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Choose Specialization</h2>

              <select
                name="specialization"
                value={medicalHistory.specialization}
                onChange={handleMedicalChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>

                {specsList.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          )}

          {activeStep === 'medical' && (
            <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
              <h2 className="text-xl font-bold mb-4">Medical Information</h2>
              <input
                name="currentSickness"
                value={medicalHistory.currentSickness}
                placeholder="Current Sickness"
                onChange={handleMedicalChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="allergies"
                value={medicalHistory.allergies}
                placeholder="Known Allergies"
                onChange={handleMedicalChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="symptoms"
                value={medicalHistory.symptoms}
                placeholder="Symptoms"
                onChange={handleMedicalChange}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {activeStep === 'documents' && (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 p-10 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="text-3xl mb-2">📁</div>
                <div className="text-gray-600 font-medium">Click to upload records</div>
                <div className="text-xs text-gray-400 mt-1">Supports PDF, PNG, JPG</div>
              </div>

              {files.length > 0 && (
                <div className="mt-6 text-left border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Selected Files ({files.length}):
                  </h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-sm"
                      >
                        <span className="truncate max-w-xs text-gray-600 font-medium">
                          📄 {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeStep === 'submission' && (
            <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Agreement & Signature</h2>

              <label className="flex items-start cursor-pointer space-x-2 select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-600">
                  I hereby confirm that all the personal and medical information provided above is accurate,
                  complete, and up to date — and I agree to the clinic rules and privacy policy.
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Please Sign (Draw) Below:
                  </label>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded transition-colors font-medium"
                  >
                    🔄 Clear Signature
                  </button>
                </div>

                <div className="border border-gray-300 rounded-lg bg-gray-50 overflow-hidden shadow-inner">
                  <SignatureCanvas
                    ref={sigCanvasRef}
                    penColor="black"
                    canvasProps={{
                      width: 700,
                      height: 200,
                      className: "w-full h-48 bg-white cursor-crosshair block"
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors shadow-sm mt-4"
              >
                Submit Complete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;