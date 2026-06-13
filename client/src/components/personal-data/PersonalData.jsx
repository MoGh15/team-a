import React from 'react';

const PersonalData = ({ formData, handlePersonalChange }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mt-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            type="text" name="name" value={formData.name || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Muster"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            type="text" name="surname" value={formData.surname || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mann"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" name="email" value={formData.email || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="m.mann@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" name="phone" value={formData.phone || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="+1 234 567 890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input 
            type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input 
            type="text" name="city" value={formData.city || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Hamburg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
          <input 
            type="text" name="street" value={formData.street || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Main Street"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Building Number</label>
          <input 
            type="text" name="buildingNumber" value={formData.buildingNumber || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="44"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apartment Number</label>
          <input 
            type="number" name="apartNumber" value={formData.apartNumber || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <input 
            type="text" name="postCode" value={formData.postCode || ''} onChange={handlePersonalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="20095"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalData;