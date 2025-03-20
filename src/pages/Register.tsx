import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
        credentials: "include", // Ensure cookies are sent
      });

      if (!response.ok) throw new Error("Registration failed");

      const user = await response.json();
      setUser(user); // Store user data in Zustand
      navigate("/dashboard"); // Redirect after successful registration
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded w-96">
        <h2 className="text-xl mb-4">Register</h2>
        <input className="border p-2 w-full mb-2" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2 w-full mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select className="border p-2 w-full mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">Register</button>
        <p className="mt-4 text-center">
  already registered? <a href="/login" className="text-blue-500">Login here</a>
</p>
      </form>
    </div>
  );
};

export default Register;
