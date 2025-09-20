import { fetcher } from "..";

// 이미지 업로드 응답 타입
export interface ImageUploadResponse {
  success: boolean;
  data: {
    imageUrl: string;
  };
}

// 이미지 업로드 API
export const uploadImageAPI = (file: File, type: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
  const url = BASE_URL ? `${BASE_URL}/images/upload` : "/images/upload";

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
