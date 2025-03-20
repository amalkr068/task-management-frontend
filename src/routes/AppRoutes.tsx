import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminReports from "../pages/AdminReports"; //  Import Admin Reports
import { useAuthStore } from "../store/authStore";

const AppRoutes = () => {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Redirect based on role after login */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Prevent logged-in users from accessing login/register */}
        <Route
          path="/login"
          element={user ? (user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) : <Login />}
        />
        <Route
          path="/register"
          element={user ? (user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) : <Register />}
        />

        {/* Role-based routes */}
        <Route path="/dashboard" element={user?.role === "user" ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />} />

        {/*  Admin Reports (Only Admins) */}
        <Route path="/admin/reports" element={user?.role === "admin" ? <AdminReports /> : <Navigate to="/" replace />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
