import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (name, email) => {
    await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email }),
    });
    set({ isAuthenticated: true });
  },
  logout: async () => {
    await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    set({ isAuthenticated: false });
  },
}));
