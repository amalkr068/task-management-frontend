import { create } from "zustand";
import { login, logout, fetchUserProfile } from "../api/auth";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Login function
  login: async (email, password) => {
    const user = await login(email, password);
    set({ user, isAuthenticated: true });
  },

  // Logout function
  logout: async () => {
    await logout();
    set({ user: null, isAuthenticated: false });
  },

  // Fetch user details (MySQL)
  fetchUser: async () => {
    try {
      const response = await fetchUserProfile();
      set({ user: response, isAuthenticated: true });
    } catch (error: any) {
      if (error.message.includes("No authentication token")) {
        console.warn("User is not logged in, redirecting to login.");
        set({ user: null, isAuthenticated: false });
      }
    }
  },
}));
