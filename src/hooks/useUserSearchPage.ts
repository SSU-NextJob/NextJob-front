import { useUserTypeOptions } from "./useUserTypeOptions";
import { useUserSearch } from "./useUserSearch";
import { useUserList } from "./useUserList";
import { useCallback, useEffect } from "react";

/**
 * Level 2 - 조합 훅: Level 1 훅들을 조합하여 완전한 검색 페이지 기능 제공
 * 
 * 단일 책임: Level 1 훅들을 조합하여 검색 페이지의 전체 로직을 연결
 * 조합 방식: useUserTypeOptions + useUserSearch + useUserList = 완전한 검색 기능
 * 확장성: 각 Level 1 훅을 독립적으로 교체하거나 재사용 가능
 */
export function useUserSearchPage() {
  const { userTypeOptions, loading: typeLoading, error: typeError } = useUserTypeOptions();
  const { selectedUserType, searchKeyword, handleSelect, handleKeywordChange } = useUserSearch();
  const { users, error: listError, isLoading: listLoading, searchUsers } = useUserList();

  // 초기 데이터 로드
  useEffect(() => {
    searchUsers();
  }, []);

  const handleSearch = useCallback(() => {
    searchUsers(selectedUserType, searchKeyword);
  }, [selectedUserType, searchKeyword, searchUsers]);

  const handleSearchOnly = useCallback(() => {
    searchUsers(selectedUserType, searchKeyword);
  }, [selectedUserType, searchKeyword, searchUsers]);

  return {
    userTypeOptions,
    selectedUserType,
    searchKeyword,
    handleSelect,
    handleKeywordChange,
    handleSearch,
    handleSearchOnly,
    users,
    typeLoading,
    typeError,
    listLoading,
    listError,
  };
} 