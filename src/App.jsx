import { Routes, Route, Navigate } from "react-router-dom";
import Home           from "./pages/Home";
import ParentForm     from "./pages/ParentForm";
import TutorForm      from "./pages/TutorForm";
import AdminLogin     from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

/**
 * ProtectedRoute — checks for adminToken in localStorage
 * If not present, redirects to /admin login page
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin" replace />;
}

function App() {
  return (
    <Routes>
      {/* ── Public routes ── */}
      <Route path="/"       element={<Home />} />
      <Route path="/parent" element={<ParentForm />} />
      <Route path="/tutor"  element={<TutorForm />} />

      {/* ── Admin routes (completely separate from public) ── */}
      <Route path="/admin"  element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;