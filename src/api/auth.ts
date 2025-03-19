const API_URL = "http://localhost:5000/auth";

// Login User
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Ensures cookies are sent with the request
  });

  if (!response.ok) throw new Error("Login failed");
  return await response.json();
};

// Logout User
export const logout = async () => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include", // Ensures cookies are cleared on logout
  });
};

// Fetch User Profile (from MySQL)
export const fetchUserProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    credentials: "include", // Sends stored cookies for authentication
  });

  if (!response.ok) throw new Error("Failed to fetch user profile");
  return await response.json();
};
