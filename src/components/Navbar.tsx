import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/dashboard">Dashboard</Link>
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
