import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number | null;
  userName: string | null;
  email: string | null;
  isVisible: boolean | null;
  sessionExpiry: number | null;
  setUser: (user: { userId: number; userName: string; email?: string; isVisible?: boolean }) => void;
  setGoogleUser: (user: { userId: number; name: string; email: string; isVisible: boolean }) => void;
  clearUser: () => void;
  isSessionValid: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userId: null,
      userName: null,
      email: null,
      isVisible: null,
      sessionExpiry: null,
      setUser: ({ userId, userName, email, isVisible }) => set({ 
        userId, 
        userName, 
        email: email || null, 
        isVisible: isVisible || null,
        sessionExpiry: Date.now() + 60 * 60 * 1000 // 1시간 후 만료
      }),
      setGoogleUser: ({ userId, name, email, isVisible }) => set({ 
        userId, 
        userName: name, 
        email, 
        isVisible,
        sessionExpiry: Date.now() + 60 * 60 * 1000 // 1시간 후 만료
      }),
      clearUser: () => set({ 
        userId: null, 
        userName: null, 
        email: null, 
        isVisible: null, 
        sessionExpiry: null 
      }),
      isSessionValid: () => {
        const state = get();
        return state.sessionExpiry ? Date.now() < state.sessionExpiry : false;
      },
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
