import { useState, useCallback } from "react";
import { Button, Box, Flex, Text, Grid } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { DocumentEmptyState } from "./DocumentEmptyState";
import { DocumentSearch } from "./DocumentSearch";
import { Pagination } from "../modules/Pagination";
import {
  type Document,
  filterDocuments,
  calculatePagination,
  createNewDocument,
  isAllowedFileType,
} from "./documents.utils";

const ITEMS_PER_PAGE = 12;

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Project Requirements.pdf",
    size: 2456789,
    uploader: "Alice Johnson",
    uploadDate: "2024-08-20",
    type: "pdf",
  },
  {
    id: "2",
    name: "Design Mockups.jpg",
    size: 4567890,
    uploader: "Bob Smith",
    uploadDate: "2024-08-19",
    type: "jpg",
    url: "https://images.unsplash.com/photo-1547027072-332f09bd6bb3",
  },
  {
    id: "3",
    name: "Budget Analysis.xlsx",
    size: 1234567,
    uploader: "Carol Davis",
    uploadDate: "2024-08-18",
    type: "xlsx",
  },
];

/**
 * 문서 뷰 컴포넌트
 * 프로젝트 관련 문서들을 관리합니다.
 */
export function DocumentsView() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const filteredDocuments = filterDocuments(documents, searchQuery);
  const { totalPages, startIndex, endIndex } = calculatePagination(
    filteredDocuments.length,
    ITEMS_PER_PAGE,
    currentPage
  );
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFileUpload = useCallback((files: FileList) => {
    const newDocuments: Document[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (isAllowedFileType(file.name)) {
        const newDoc = createNewDocument(file, i);
        newDocuments.push(newDoc);
      }
    }

    setDocuments((prev) => [...newDocuments, ...prev]);
    setIsUploadOpen(false);
  }, []);

  const handleDownload = useCallback((document: Document) => {
    console.log("Downloading:", document.name);
  }, []);

  const handleDelete = useCallback((document: Document) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== document.id));
  }, []);

  const isEmpty = filteredDocuments.length === 0;

  return (
    <Box className="flex-1 p-6">
      <Flex className="mb-6 items-center justify-between">
        <div>
          <Text className="text-2xl font-semibold mb-2">Documents</Text>
          <Text className="text-gray-600">파일을 체계적으로 관리하세요</Text>
        </div>
        <Button colorScheme="blue" onClick={() => setIsUploadOpen(true)}>
          <Plus size={16} style={{ marginRight: "8px" }} />
          업로드
        </Button>
      </Flex>

      {!isEmpty && (
        <DocumentSearch value={searchQuery} onChange={handleSearch} />
      )}

      {isEmpty && !searchQuery && (
        <DocumentEmptyState
          type="no-documents"
          onUpload={() => setIsUploadOpen(true)}
        />
      )}

      {isEmpty && searchQuery && (
        <DocumentEmptyState
          type="no-search-results"
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />
      )}

      {!isEmpty && (
        <>
          <Grid
            className="gap-4 mb-8"
            templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          >
            {paginatedDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </Grid>

          {totalPages > 1 && (
            <Flex className="justify-center">
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            </Flex>
          )}
        </>
      )}

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleFileUpload}
      />
    </Box>
  );
}
