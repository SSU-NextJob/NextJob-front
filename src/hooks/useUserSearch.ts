import { useState, useCallback } from "react";

/**
 * Level 1 - 원자적 훅: 검색 상태만 관리
 * 
 * 단일 책임: 검색 관련 상태(선택된 타입, 검색어)만 관리
 * 재사용성: 다른 검색 기능에서도 동일한 로직으로 재사용 가능
 */
export function useUserSearch() {
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSelect = useCallback((selected: string) => {
    setSelectedUserType(selected);
  }, []);

  const handleKeywordChange = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  return {
    selectedUserType,
    searchKeyword,
    handleSelect,
    handleKeywordChange,
  };
} 