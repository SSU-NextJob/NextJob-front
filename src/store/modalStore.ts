import { create } from "zustand";
import { nanoid } from "nanoid";

export type ModalType = "createProject" | "apply" | "suggest" | "recruit";

export interface ModalStackItem {
  id: string;
  type: ModalType;
  props?: any;
}

interface ModalStore {
  stack: ModalStackItem[];
  onOpenModal: (type: ModalType, props?: any) => void;
  onCloseModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  stack: [],
  onOpenModal: (type, props) => {
    console.log("onOpenModal", type, props),
      set((state) => ({
        stack: [...state.stack, { id: nanoid(), type, props }],
      }));
  },
  onCloseModal: () =>
    set((state) => ({
      stack: state.stack.slice(0, -1),
    })),
}));
