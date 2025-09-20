// Removed unused imports

/**
 * 문서 타입 정의
 */
export interface Document {
  id: string;
  name: string;
  size: number;
  uploader: string;
  uploadDate: string;
  type: string;
  url?: string;
}

/**
 * 파일 크기를 사람이 읽기 쉬운 형태로 변환
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 날짜를 사람이 읽기 쉬운 형태로 변환
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * 파일 타입에 따른 아이콘 반환
 */
// export function getFileIcon(type: string): any {
//   const iconProps = { size: 48 };

//   switch (type.toLowerCase()) {
//     case "pdf":
//       return <FileText {...iconProps} color="var(--chakra-colors-red-500)" />;
//     case "xlsx":
//     case "xls":
//       return <FileSpreadsheet {...iconProps} color="var(--chakra-colors-green-600)" />;
//     case "jpg":
//     case "jpeg":
//     case "png":
//     case "gif":
//     case "svg":
//       return <FileImage {...iconProps} color="var(--chakra-colors-blue-500)" />;
//     case "zip":
//     case "rar":
//     case "7z":
//       return <Archive {...iconProps} color="var(--chakra-colors-yellow-600)" />;
//     default:
//       return <File {...iconProps} color="var(--chakra-colors-gray-500)" />;
//   }
// }

/**
 * 이미지 파일 타입 체크
 */
export function isImageFile(type: string): boolean {
  return ["jpg", "jpeg", "png", "gif"].includes(type.toLowerCase());
}

/**
 * 허용된 파일 타입 체크
 */
export function isAllowedFileType(fileName: string): boolean {
  const allowedTypes = [
    "pdf",
    "xlsx",
    "xls",
    "txt",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "zip",
    "rar",
    "7z",
  ];
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  return allowedTypes.includes(fileExtension);
}

/**
 * 파일 확장자 추출
 */
export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

/**
 * 새 문서 객체 생성
 */
export function createNewDocument(file: File, index: number = 0): Document {
  const fileExtension = getFileExtension(file.name);

  return {
    id: Date.now().toString() + index,
    name: file.name,
    size: file.size,
    uploader: "Current User",
    uploadDate: new Date().toISOString().split("T")[0],
    type: fileExtension,
    url: isImageFile(fileExtension) ? URL.createObjectURL(file) : undefined,
  };
}

/**
 * 페이지네이션 계산
 */
export function calculatePagination(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * 문서 검색 필터
 */
export function filterDocuments(
  documents: Document[],
  searchQuery: string
): Document[] {
  if (!searchQuery.trim()) return documents;

  return documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
