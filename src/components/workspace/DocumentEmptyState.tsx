import { Button, Text, Box } from "@chakra-ui/react";
import { FileText, Search, Plus } from "lucide-react";

interface DocumentEmptyStateProps {
  type: "no-documents" | "no-search-results";
  searchQuery?: string;
  onUpload?: () => void;
  onClearSearch?: () => void;
}

export function DocumentEmptyState({
  type,
  searchQuery,
  onUpload,
  onClearSearch,
}: DocumentEmptyStateProps) {
  if (type === "no-documents") {
    return (
      <Box className="p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-gray-400 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
          <FileText size={64} />
        </div>
        <Text className="text-lg font-semibold mb-2">아직 문서가 없습니다</Text>
        <Text className="text-gray-600 mb-4">
          첫 번째 문서를 업로드하여 파일 관리를 시작하세요.
        </Text>
        {onUpload && (
          <Button
            colorScheme="blue"
            onClick={onUpload}
          >
            <Plus size={16} className="mr-2" />
            문서 업로드
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box className="p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-gray-400 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
        <Search size={64} />
      </div>
      <Text className="text-lg font-semibold mb-2">검색 결과가 없습니다</Text>
      <Text className="text-gray-600 mb-4">
        "{searchQuery}"에 대한 검색 결과를 찾을 수 없습니다.
        <br />
        다른 검색어를 시도하거나 새 문서를 업로드하세요.
      </Text>
      {onClearSearch && (
        <Button variant="outline" onClick={onClearSearch}>
          검색 초기화
        </Button>
      )}
    </Box>
  );
}
