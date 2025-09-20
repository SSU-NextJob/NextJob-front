import { useCallback, useState } from "react";
import { Button, Text, Input, Box } from "@chakra-ui/react";
import { Upload, X } from "lucide-react";
import { Modal } from "../modules/@modal/Modal";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList) => void;
}

export function DocumentUploadModal({
  isOpen,
  onClose,
  onUpload,
}: DocumentUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onUpload(e.dataTransfer.files);
      }
    },
    [onUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="w-96">
        <div className="flex items-center justify-between mb-4">
          <Text className="text-lg font-semibold">문서 업로드</Text>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
        
        <Box
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ease-in-out ${
            dragActive 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-300 bg-transparent"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Box className="w-12 h-12 text-gray-400 mx-auto mb-4 flex items-center justify-center">
            <Upload size={48} />
          </Box>
          <Text className="mb-2">파일을 여기로 드래그하거나 클릭하여 업로드</Text>
          <Text className="text-sm text-gray-600 mb-4">또는 아래 버튼을 클릭하여 파일 선택</Text>

          <Input
            type="file"
            multiple
            accept=".pdf,.xlsx,.xls,.txt,.jpg,.jpeg,.png,.gif,.svg,.zip,.rar,.7z"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            id="file-upload-input"
          />

          <label htmlFor="file-upload-input">
            <Button
              as="span"
              colorScheme="blue"
              variant="outline"
              cursor="pointer"
            >
              파일 선택
            </Button>
          </label>

          <Text fontSize="xs" color="gray.500" mt={4}>
            지원 형식: PDF, XLSX, TXT, JPG, PNG, SVG, ZIP
          </Text>
        </Box>
      </div>
    </Modal>
  );
}