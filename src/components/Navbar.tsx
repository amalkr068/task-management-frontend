import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Ensures cookies are cleared
    });
    logout(); // Clear Zustand state
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
     {user?.role === 'user' && <Link to="/dashboard">Dashboard</Link>}
     {user?.role === "admin" && (
          <>
            <Link to="/admin" className="px-3 py-2 bg-gray-700 rounded">Admin Dashboard</Link>
            <Link to="/admin/reports" className="px-3 py-2 bg-gray-700 rounded">Reports</Link>
          </>
        )}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
