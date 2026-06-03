import React from 'react';
import {useState} from 'react';

const PersonalData = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Submitted data: ${JSON.stringify(formData)}`);
  }


  const formFields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'muster', required: true, grid: 'md:col-span-1' },
    { label: 'Surname', name: 'surname', type: 'text',placeholder: 'Mann', required: true, grid: 'md:col-span-1' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'muster.mann@example.com', required: true, grid: 'md:col-span-1' },
    { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+49 123 456 789', grid: 'md:col-span-1' },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', grid: 'md:col-span-1' },
    { label: 'Street', name: 'street', type: 'text', placeholder: 'Musterstraße 123', grid: 'md:col-span-1' },
    { label: 'City', name: 'city', type: 'text', placeholder: 'Musterstadt', grid: 'md:col-span-1' },
    { label: 'Postal Code', name: 'postalCode', type: 'text', placeholder: '12345', grid: 'md:col-span-1' },
    { label: 'Country', name: 'country', type: 'text' },
  ];


  const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800';
  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Personal Data</h2>
        <p className="text-sm text-gray-500 mt-1">Please enter your personal and address details accurately.</p>
      </div>


      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.name} className={field.grid}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder || ''}
                required={field.required}
                className={inputClass}
              />
            </div>
          ))}
        </div>


        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Data
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default PersonalData;