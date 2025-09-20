import { fetcher } from "../../index";
import type {
  UploadFileRequest,
  DeleteBlobRequest,
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
  console.log("....data", data);
  formData.append("file", data.file);
  formData.append("userId", data.userId.toString());

  const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
  const url = BASE_URL
    ? `${BASE_URL}/drives/${driveId}/blobs/upload`
    : `/drives/${driveId}/blobs/upload`;

  return fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
  }).then(async (res) => {
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || "API 호출 실패");
    }

    const responseData = await res.json();

    if (responseData.success === false) {
      const errorMessage =
        responseData.error?.message || "요청 처리 중 오류가 발생했습니다.";
      throw new Error(errorMessage);
    }

    return responseData;
  });
};

// 문서 삭제 API - DELETE /drives/blobs/:blobId
export const deleteBlob = async (
  request: DeleteBlobRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/drives/blobs/${request.blobId}`, {
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
  request: DownloadBlobRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(
    `/drives/blobs/${request.blobId}/download`,
    {
      method: "GET",
    }
  );
};
