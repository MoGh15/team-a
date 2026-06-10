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
      {/* 1. مسار المريض: عام ومفتوح تماماً بدون أي حماية أو تسجيل دخول */}
      <Route path="/" element={<PatientPortal />} />

      {/* 2. مسار تسجيل دخول الأدمن */}
      <Route path="/login" element={<Login />} />

      {/* 3. مسار لوحة تحكم الأدمن: محمي ولا يفتح إلا بعد تسجيل الدخول */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* تحويل أي مسار مجهول إلى الصفحة الرئيسية للمريض */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;