import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const PatientManagement = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editingPatient, setEditingPatient] = useState(null);
  const [updateForm, setUpdateForm] = useState({ name: '', surname: '', email: '' });

  // استخدام المنفذ 5004 بناءً على طلبك
  const API_URL = 'http://localhost:5004/api/patients';

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError(err.response?.data?.message || 'Failed to load patients.');
      setLoading(false);
    }
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient._id);
    setUpdateForm({
      name: patient.name,
      surname: patient.surname,
      email: patient.email
    });
  };

  const handleUpdateSubmit = async (e, patientId) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${patientId}`, updateForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingPatient(null);
      fetchPatients(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update patient info.');
    }
  };

  const handleDeleteClick = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient permanently?')) {
      try {
        await axios.delete(`${API_URL}/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPatients(); 
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete patient.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-sm text-gray-500">View, update, and remove patient records.</p>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading records...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">{error}</div>
          ) : patients.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold border-b border-gray-100">
                    <th className="p-4">Name</th>
                    <th className="p-4">Surname</th>
                    <th className="p-4">Email</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {patients.map((patient) => (
                    <tr key={patient._id} className="hover:bg-gray-50/70">
                      {editingPatient === patient._id ? (
                        <td colSpan="4" className="p-4 bg-blue-50/30">
                          <form onSubmit={(e) => handleUpdateSubmit(e, patient._id)} className="flex items-center gap-3">
                            <input type="text" value={updateForm.name} onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })} className="border rounded px-2 py-1 text-sm flex-1" required />
                            <input type="text" value={updateForm.surname} onChange={(e) => setUpdateForm({ ...updateForm, surname: e.target.value })} className="border rounded px-2 py-1 text-sm flex-1" required />
                            <input type="email" value={updateForm.email} onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })} className="border rounded px-2 py-1 text-sm flex-1" required />
                            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded text-xs">Save</button>
                            <button type="button" onClick={() => setEditingPatient(null)} className="bg-gray-500 text-white px-3 py-1 rounded text-xs">Cancel</button>
                          </form>
                        </td>
                      ) : (
                        <>
                          <td className="p-4 font-medium text-gray-900">{patient.name}</td>
                          <td className="p-4">{patient.surname}</td>
                          <td className="p-4">{patient.email}</td>
                          <td className="p-4 flex justify-center gap-2">
                            <button onClick={() => handleEditClick(patient)} className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-xs">Edit</button>
                            <button onClick={() => handleDeleteClick(patient._id)} className="text-red-600 bg-red-50 px-3 py-1 rounded text-xs">Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PatientManagement;