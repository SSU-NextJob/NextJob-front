export interface UploadFileRequest {
  file: File;
  userId: string;
}

export interface DeleteBlobRequest {
  blobId: number;
}

export interface GetBlobsRequest {
  driveId: number;
  search?: string;
}

export interface DownloadBlobRequest {
  blobId: number;
}

export interface BlobResponse {
  fileName: string;
  blobUrl: string;
  ext: string;
  size: number;
  createDate: string;
  userName: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  data: T;
  error: string | null;
}
