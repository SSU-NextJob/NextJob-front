import { useModalStore } from "@/store/modalStore";

export const showErrorModal = (message: string) => {
  // useModalStore 훅을 직접 사용할 수 없으므로, 스토어 인스턴스를 직접 가져옴
  const modalStore = useModalStore.getState();
  modalStore.onOpenModal("error", { message });
};
