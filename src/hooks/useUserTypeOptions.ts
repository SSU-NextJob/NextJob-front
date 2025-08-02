import { useState, useEffect } from "react";
import { getGroupCode, type CodeResponse } from "@/apis/group";

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