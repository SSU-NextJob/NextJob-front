import { Button } from "@/components/atoms/Button";
import { useModalStore } from "@/store/modalStore";

interface ErrorModalProps {
  message: string;
}

export const ErrorModal = ({ message }: ErrorModalProps) => {
  const { onCloseModal } = useModalStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">오류</h3>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">{message}</p>
        </div>

        <div className="flex justify-end">
          <Button onClick={onCloseModal} color="blue">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};
