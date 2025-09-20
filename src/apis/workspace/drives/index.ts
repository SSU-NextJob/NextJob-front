import { fetcher } from "../../index";
import type {
  UploadFileRequest,
  DeleteBlobRequest,
  GetBlobsRequest,
  DownloadBlobRequest,
  ApiResponse,
  BlobResponse,
} from "./types";

// 문서 업로드 API - POST /drives/:driveId/blobs/upload
export const uploadFile = async (
  driveId: number,
  data: UploadFileRequest
): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("userId", data.userId);

  return await fetcher<ApiResponse>(`/drives/${driveId}/blobs/upload`, {
    method: "POST",
    body: formData,
  });
};

// 문서 삭제 API - DELETE /drives/blobs/:blobId
export const deleteBlob = async (
  blobId: DeleteBlobRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/drives/blobs/${blobId}`, {
    method: "DELETE",
  });
};

// 문서 목록 조회 API - GET /drives/:driveId/blobs
export const getBlobs = async (
  driveId: number,
  search?: string
): Promise<ApiResponse<BlobResponse[]>> => {
  const queryParams = search ? `?search=${encodeURIComponent(search)}` : "";
  return await fetcher<ApiResponse<BlobResponse[]>>(
    `/drives/${driveId}/blobs${queryParams}`,
    {
      method: "GET",
    }
  );
};

// 문서 다운로드 API - GET /drives/blobs/:blobId/download
export const downloadBlob = async (
  blobId: DownloadBlobRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/drives/blobs/${blobId}/download`, {
    method: "GET",
  });
};
