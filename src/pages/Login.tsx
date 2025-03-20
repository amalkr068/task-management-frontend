import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Sends cookies
      });

      if (!response.ok) throw new Error("Login failed");

      const user = await response.json();
      setUser(user); // Update Zustand store
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="border p-2 w-full mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">Login</button>
        <p className="mt-4 text-center">
  Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
</p>
      </form>
      

    </div>
  );
};

export default Login;
