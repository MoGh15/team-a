import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import AdminDashboard from './components/admin-dashboard/AdminDashboard';
import PatientPortal from './pages/PatientPortal'; 
import './App.css';
import PatientManagement from './pages/PatientManagement';
import MainPortal from './pages/MainPortal';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorManagement from './pages/DoctorManagement';



function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPortal />} />
      <Route path="/patient-portal" element={<PatientPortal />} />

      <Route path="/login" element={<Login />} />

      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>

        }
      />
      <Route path='/admin/patients' element={
        <ProtectedRoute>
          <PatientManagement />
        </ProtectedRoute>
      } />
      <Route path='/admin/doctors' element={
        <ProtectedRoute>
          <DoctorManagement />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;