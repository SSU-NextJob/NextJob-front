import { Button, Box, Text } from "@chakra-ui/react";
import { Download, Trash2 } from "lucide-react";
import {
  type Document,
  formatFileSize,
  formatDate,
  // getFileIcon,
  isImageFile,
} from "./documents.utils";

interface DocumentCardProps {
  document: Document;
  onDownload: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

export function DocumentCard({
  document,
  onDownload,
  onDelete,
}: DocumentCardProps) {
  const isImage = isImageFile(document.type);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(document);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(document);
  };

  return (
    <Box className="relative overflow-hidden cursor-pointer transition-all duration-200 ease-in-out bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg group">
      <Box className="relative h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
        {isImage && document.url ? (
          <img
            src={document.url}
            alt={document.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            {/* {getFileIcon(document.type)} */}
          </div>
        )}

        <Box className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center gap-3">
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleDownload}
          >
            <Download size={16} className="mr-2" />
            Download
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={handleDelete}
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
        </Box>
      </Box>

      <Box className="p-4">
        <Text
          className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis mb-1"
          title={document.name}
        >
          {document.name}
        </Text>
        <Text className="text-xs text-gray-600 mb-1">
          {formatFileSize(document.size)}
        </Text>
        <Text className="text-xs text-gray-600 mb-1">{document.uploader}</Text>
        <Text className="text-xs text-gray-600">
          {formatDate(document.uploadDate)}
        </Text>
      </Box>
    </Box>
  );
}
