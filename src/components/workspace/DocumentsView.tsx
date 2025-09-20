import { useState, useCallback, useEffect } from "react";
import { Button, Box, Flex, Text, Grid } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { DocumentCard } from "./DocumentCard";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { DocumentEmptyState } from "./DocumentEmptyState";
import { DocumentSearch } from "./DocumentSearch";
import { Pagination } from "../modules/Pagination";
import { useWorkspace } from "@/hooks/workspace/useWorkspace";
import { getBlobs, downloadBlob, deleteBlob } from "@/apis/workspace/drives";
import type { BlobResponse } from "@/apis/workspace/drives/types";
import { filterDocuments, calculatePagination } from "./documents.utils";

const ITEMS_PER_PAGE = 12;

interface Document {
  id: string;
  blobId?: number;
  name: string;
  size: number;
  uploader: string;
  uploadDate: string;
  type: string;
  url?: string;
}

function convertBlobToDocument(blob: BlobResponse, index: number): Document {
    // Extract blobId from URL or use index as fallback
    const urlParts = blob.blobUrl.split("/");
    const blobId = urlParts[urlParts.length - 1];
    const numericBlobId = parseInt(blobId) || index + 1;
  
  return {
    id: blob.blobUrl,
    blobId: blob.blobId, // 서버에서 제공하는 실제 blobId 사용
    name: blob.fileName,
    size: blob.size,
    uploader: blob.userName,
    uploadDate: blob.createDate,
    type: blob.ext,
    url: blob.blobUrl,
  };
}

/**
 * 문서 뷰 컴포넌트
 * 프로젝트 관련 문서들을 관리합니다.
 */
export function DocumentsView() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const { workspaceDetail } = useWorkspace(workspaceId || undefined);
  const driveId = workspaceDetail?.data?.drive?.driveId;

  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const loadDocuments = useCallback(async () => {
    if (!driveId) return;

    setIsLoading(true);
    try {
      const response = await getBlobs(driveId, searchQuery);
      if (response.success && response.data) {
        const convertedDocs = response.data.map((blob, index) =>
          convertBlobToDocument(blob, index)
        );
        setDocuments(convertedDocs);
      }
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setIsLoading(false);
    }
  }, [driveId, searchQuery]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleFileUpload = useCallback(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleDownload = useCallback(async (document: Document) => {
    try {
      if (document.blobId) {
        const response = await downloadBlob({ blobId: document.blobId });
        if (response.success) {
          window.open(document.url, "_blank");
        }
      } else {
        // Fallback: direct download from URL
        window.open(document.url, "_blank");
      }
    } catch (error) {
      console.error("Failed to download document:", error);
      // Fallback: direct download from URL
      window.open(document.url, "_blank");
    }
  }, []);

  const handleDelete = useCallback(
    async (document: Document) => {
      if (!document.blobId) {
        console.error("Blob ID is required for deletion");
        return;
      }

      try {
        const response = await deleteBlob({ blobId: document.blobId });
        if (response.success) {
          await loadDocuments();
        }
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    },
    [loadDocuments]
  );

  const isEmpty = filteredDocuments.length === 0;

  return (
    <Box className="flex-1 p-6">
      <Flex className="mb-6 items-center justify-between">
        <div>
          <Text className="text-2xl font-semibold mb-2">Documents</Text>
          <Text className="text-gray-600">파일을 체계적으로 관리하세요</Text>
        </div>
        <Button
          colorScheme="blue"
          onClick={() => setIsUploadOpen(true)}
          className="text-gray-700"
        >
          <Plus size={16} style={{ marginRight: "8px" }} />
          업로드
        </Button>
      </Flex>

      {!isLoading && !isEmpty && (
        <DocumentSearch value={searchQuery} onChange={handleSearch} />
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <Text className="text-gray-600">문서를 불러오는 중...</Text>
        </div>
      )}

      {!isLoading && isEmpty && !searchQuery && (
        <DocumentEmptyState
          type="no-documents"
          onUpload={() => setIsUploadOpen(true)}
        />
      )}

      {!isLoading && isEmpty && searchQuery && (
        <DocumentEmptyState
          type="no-search-results"
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />
      )}

      {!isLoading && !isEmpty && (
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
        driveId={driveId}
      />
    </Box>
  );
}
