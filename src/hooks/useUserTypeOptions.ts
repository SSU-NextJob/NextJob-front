import { useState, useEffect } from "react";
import { getGroupCode, type CodeResponse } from "@/apis/group";

/**
 * Level 1 - 원자적 훅: 사용자 타입 옵션만 관리
 * 
 * 단일 책임: 사용자 타입 옵션을 가져오는 것만 담당
 * 재사용성: 다른 컴포넌트에서도 사용자 타입 옵션이 필요할 때 재사용 가능
 */
export function useUserTypeOptions() {
  const [userTypeOptions, setUserTypeOptions] = useState<CodeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getGroupCode("USER_TYPE")
      .then((res) => {
        if (res.success) {
          setUserTypeOptions(res.data);
        } else {
          setError("사용자 타입을 불러오지 못했습니다.");
        }
      })
      .catch(() => setError("사용자 타입을 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, []);

  return {
    userTypeOptions,
    loading,
    error,
  };
} 