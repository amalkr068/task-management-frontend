import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser(); // Fetch user details when the app loads
  }, []);

  return <AppRoutes />;
}

export default App;
