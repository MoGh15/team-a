import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import AdminDashboard from './components/admin-dashboard/AdminDashboard';
import useAuthStore from './store/authStore';
import PatientPortal from './pages/PatientPortal'; 
import './App.css';

// حماية مسارات الأدمن فقط
function ProtectedRoute({ children }) {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PatientPortal />} />

      <Route path="/login" element={<Login />} />

      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;