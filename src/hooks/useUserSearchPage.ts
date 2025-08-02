import { useUserTypeOptions } from "./useUserTypeOptions";
import { useUserSearch } from "./useUserSearch";
import { useUserList } from "./useUserList";
import { useCallback, useEffect } from "react";

export function useUserSearchPage() {
  // Level 1 훅들
  const { userTypeOptions, loading: typeLoading, error: typeError } = useUserTypeOptions();
  const { selectedUserType, searchKeyword, handleSelect, handleKeywordChange } = useUserSearch();
  const { users, error: listError, isLoading: listLoading, isInitialized, searchUsers } = useUserList();

  // 페이지 진입 시 초기 데이터 로드 (파라미터 없이 호출)
  useEffect(() => {
    if (!isInitialized) {
      searchUsers();
    }
  }, [isInitialized]);

  // 검색 함수들
  const handleSearch = useCallback(() => {
    searchUsers(selectedUserType, searchKeyword);
  }, [selectedUserType, searchKeyword, searchUsers]);

  const handleSearchOnly = useCallback(() => {
    searchUsers(selectedUserType, searchKeyword);
  }, [selectedUserType, searchKeyword, searchUsers]);

  return {
    // 검색 관련
    userTypeOptions,
    selectedUserType,
    searchKeyword,
    handleSelect,
    handleKeywordChange,
    handleSearch,
    handleSearchOnly,
    
    // 데이터 관련
    users,
    
    // 상태 관련
    typeLoading,
    typeError,
    listLoading,
    listError,
  };
} 