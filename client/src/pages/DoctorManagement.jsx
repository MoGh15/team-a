import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DaysOfWeek, Specializations } from '../utils/enums';

const DoctorManagement = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const daysList = Object.values(DaysOfWeek);
  const specsList = Object.values(Specializations);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    specialization: 'Cardiology',
    email: '',
    workDays: [],
    workingHours: {
      startTime: '08:00',
      endTime: '17:00'
    }
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/doctors');
      setDoctors(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch doctors', err);
    }
  };

  const openModal = (doctor = null) => {
    if (doctor) {
      setSelectedDoctor(doctor);
      setFormData({
        name: doctor.name || '',
        surname: doctor.surname || '',
        specialization: doctor.specialization || 'Cardiology',
        email: doctor.email || '',
        workDays: doctor.workingHours?.workDays || [],
        workingHours: {
          startTime: doctor.workingHours?.startTime || '08:00',
          endTime: doctor.workingHours?.endTime || '17:00'
        }
      });
    } else {
      setSelectedDoctor(null);
      setFormData({
        name: '',
        surname: '',
        specialization: 'Cardiology',
        email: '',
        workDays: [],
        workingHours: {
          startTime: '08:00',
          endTime: '17:00'
        }
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`http://localhost:5004/api/doctors/${id}`);
        fetchDoctors();
      } catch (err) {
        console.error(err);
        alert('Failed to delete.');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDay = (dayEnumValue) => {
    setFormData((prev) => ({
      ...prev,
      workDays: prev.workDays.includes(dayEnumValue)
        ? prev.workDays.filter((d) => d !== dayEnumValue)
        : [...prev.workDays, dayEnumValue]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: formData.name,
      surname: formData.surname,
      specialization: formData.specialization,
      email: formData.email,
      workingHours: {
        workDays: formData.workDays,
        startTime: formData.workingHours.startTime,
        endTime: formData.workingHours.endTime
      }
    };

    try {
      if (selectedDoctor) {
        await axios.put(
          `http://localhost:5004/api/doctors/${selectedDoctor._id}`,
          payload
        );
      } else {
        await axios.post('http://localhost:5004/api/doctors', payload);
      }

      setIsModalOpen(false);
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save doctor profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* HEADER SECTION WITH BACK BUTTON */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-indigo-600 transition-colors border border-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Doctor Management
              </h1>
              <p className="text-sm text-gray-500">
                Register, modify, and monitor clinical staff availability clusters.
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            Add New Doctor
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-gray-500 font-medium">
              Loading records...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-500 font-medium">
              {error}
            </div>
          ) : doctors.length === 0 ? (
            <div className="p-10 text-center text-gray-400 font-medium">
              No records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">

                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold border-b border-gray-100">
                    <th className="p-4">Doctor Name</th>
                    <th className="p-4">Specialization</th>
                    <th className="p-4">Email Contact</th>
                    <th className="p-4">Working Shifts</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {doctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50/70 transition">

                      <td className="p-4 font-semibold text-gray-900">
                        Dr. {doctor.name} {doctor.surname}
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">
                          {doctor.specialization}
                        </span>
                      </td>

                      <td className="p-4 text-gray-500">{doctor.email}</td>

                      <td className="p-4 text-xs font-mono text-gray-500">
                        {doctor.workingHours?.workDays?.slice(0, 3).join(', ')}...
                        ({doctor.workingHours?.startTime}-{doctor.workingHours?.endTime})
                      </td>

                      <td className="p-4 text-center flex justify-center gap-2">
                        <button
                          onClick={() => openModal(doctor)}
                          className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded text-xs transition font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(doctor._id)}
                          className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-xs transition font-medium"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

            <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-xl overflow-y-auto max-h-[90vh]">

              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {selectedDoctor ? 'Modify Doctor Profile' : 'Register New Doctor'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Surname
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.surname}
                      onChange={(e) =>
                        setFormData({ ...formData, surname: e.target.value })
                      }
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-indigo-600"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Specialization
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2 text-sm"
                  >
                    {specsList.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-indigo-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-2">
                    Active Work Days
                  </label>

                  <div className="flex gap-2">
                    {daysList.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          formData.workDays.includes(day)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FIXED SAFE ACCESS ONLY (NO UI CHANGE) */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Shift Start Time
                    </label>
                    <input
                      type="text"
                      placeholder="08:00"
                      required
                      value={formData.workingHours.startTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workingHours: {
                            ...formData.workingHours,
                            startTime: e.target.value
                          }
                        })
                      }
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Shift End Time
                    </label>
                    <input
                      type="text"
                      placeholder="16:00"
                      required
                      value={formData.workingHours.endTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workingHours: {
                            ...formData.workingHours,
                            endTime: e.target.value
                          }
                        })
                      }
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-indigo-600"
                    />
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

                  <button
                    type="button"
                    onClick={closeModal}
                    className="border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
                  >
                    Save Profile
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorManagement;

