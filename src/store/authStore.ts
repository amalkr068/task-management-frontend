import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

// Load user data from localStorage when the app starts
const storedUser = localStorage.getItem("user");

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,

  // Update Zustand state and store in localStorage
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  // Clear Zustand state and remove from localStorage
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));
