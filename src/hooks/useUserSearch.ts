import { useState, useCallback } from "react";

export function useUserSearch() {
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [effectiveKeyword, setEffectiveKeyword] = useState<string>(""); // 실제 검색에 사용할 키워드

  const handleSelect = useCallback((selected: string) => {
    setSelectedUserType(selected);
  }, []);

  const handleKeywordChange = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const handleSearch = useCallback(() => {
    setEffectiveKeyword(searchKeyword); // 검색 버튼 클릭 시에만 검색 키워드 설정
  }, [searchKeyword]);

  // 현재 입력값을 직접 받아서 effectiveKeyword로 설정하는 함수
  const handleSearchWithValue = useCallback((value: string) => {
    setEffectiveKeyword(value);
  }, []);

  return {
    selectedUserType,
    searchKeyword,
    effectiveKeyword,
    handleSelect,
    handleKeywordChange,
    handleSearch,
    handleSearchWithValue, // 입력값을 직접 받는 함수
  };
} 