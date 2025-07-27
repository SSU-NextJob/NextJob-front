import { create } from "zustand";

interface LoadingState {
  loadingMap: Record<string, boolean>;
  setLoading: (key: string, value: boolean) => void;
  clearLoading: (key: string) => void;
  isLoading: (key: string) => boolean;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loadingMap: {},
  setLoading: (key, value) =>
    set((state) => ({
      loadingMap: { ...state.loadingMap, [key]: value },
    })),
  clearLoading: (key) =>
    set((state) => {
      const newMap = { ...state.loadingMap };
      delete newMap[key];
      return { loadingMap: newMap };
    }),
  isLoading: (key) => !!get().loadingMap[key],
}));
