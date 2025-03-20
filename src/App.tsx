//import { useEffect } from "react";
//import { useAuthStore } from "./store/authStore";
import AppRoutes from "./routes/AppRoutes";

function App() {
 /* const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/profile", {
          method: "GET",
          credentials: "include", // Sends cookies
        });

        if (!response.ok) throw new Error("User not authenticated");

        const user = await response.json();
        setUser(user); // Update Zustand store
      } catch (error) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);*/

  return <AppRoutes />;
}

export default App;
