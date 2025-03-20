import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include", // Ensures cookies are cleared
    });
    logout(); // Clear Zustand state
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/dashboard">Dashboard</Link>
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
