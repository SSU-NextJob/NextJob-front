import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number | null;
  userName: string | null;
  setUser: (user: { userId: number; userName: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      userName: null,
      setUser: ({ userId, userName }) => set({ userId, userName }),
      clearUser: () => set({ userId: null, userName: null }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
