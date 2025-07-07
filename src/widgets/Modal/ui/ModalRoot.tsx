import { useModalStore } from "@/shared/store/modalStore";
import type { ModalType } from "@/shared/store/modalStore";
import { Modal } from "./Modal";
import { CreateProjectModal } from "@/widgets/Modal/ui/CreateProjectModal";
import { ConfirmApplyModal } from "@/widgets/Modal/ui/ApplyModal";
import { SuggestModal } from "./SuggestModal";
import { RecruitTeamModal } from "@/widgets/Modal/ui/RecruitmenModal";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const MODAL_COMPONENTS: Record<ModalType, any> = {
  createProject: CreateProjectModal,
  apply: ConfirmApplyModal,
  suggest: SuggestModal,
  recruit: RecruitTeamModal,
};

export const ModalRoot = () => {
  const { stack, onCloseModal } = useModalStore();

  useEffect(() => {
    if (stack.length > 0) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [stack.length]);

  useEffect(() => {
    console.log("ModalRoot mounted");
  }, []);

  useEffect(() => {
    console.log("[ModalStack]", stack);
  }, [stack]);

  if (stack.length === 0) return null;

  const { id, type, props } = stack[stack.length - 1];
  const ModalComponent = MODAL_COMPONENTS[type];
  if (!ModalComponent) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <Modal key={id} onClose={onCloseModal}>
      <ModalComponent {...props} isOpen={true} onClose={onCloseModal} />
    </Modal>,
    modalRoot
  );
};
