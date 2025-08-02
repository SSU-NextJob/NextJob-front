const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// 타입 안정성과 공통 옵션 설정 제공
export const fetcher = async <T>(
  path: RequestInfo, // 요청 URL이나 Request 객체 (fetch의 첫 번째 인자)
  init?: RequestInit // fetch의 옵션 객체 (method, headers, body 등)
): Promise<T> => {
  const url = BASE_URL ? `${BASE_URL}${path}` : path;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    credentials: "include", // 필요 시 - 쿠키 포함 요청 (ex. 로그인 세선 유지)
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || "API 호출 실패");
  }

  const responseData = await res.json();

  // success: false인 경우 에러 처리
  if (responseData.success === false) {
    const errorMessage =
      responseData.error?.message || "요청 처리 중 오류가 발생했습니다.";

    // 에러 모달 표시
    const { showErrorModal } = await import("@/utils/showErrorModal");
    showErrorModal(errorMessage);

    throw new Error(errorMessage);
  }

  return responseData;
};
