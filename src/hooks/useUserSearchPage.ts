import { useUserTypeOptions } from "./useUserTypeOptions";
import { useUserSearch } from "./useUserSearch";
import { useUserList } from "./useUserList";

export function useUserSearchPage() {
  const { userTypeOptions, loading: typeLoading, error: typeError } = useUserTypeOptions();
  const { 
    selectedUserType, 
    searchKeyword, 
    effectiveKeyword,
    handleSelect, 
    handleKeywordChange,
  } = useUserSearch();
  
  const { users, error: listError, isLoading: listLoading, searchUsers } = useUserList({ 
    userType: selectedUserType, 
    keyword: effectiveKeyword
  });

  // 검색 버튼 클릭 시에만 API 호출
  const handleSearchWithAPI = () => {

    searchUsers(searchKeyword);
  };

  // Enter 키에서도 API 호출
  const handleSearchOnlyWithAPI = () => {
    searchUsers(searchKeyword);
  };

  return {
    // 검색 관련
    userTypeOptions,
    selectedUserType,
    searchKeyword,
    effectiveKeyword, // 검색된 키워드 추가
    handleSelect,
    handleKeywordChange,
    handleSearch: handleSearchWithAPI, // 검색 버튼용 함수
    handleSearchOnly: handleSearchOnlyWithAPI, // Enter 키용 함수
    
    // 데이터 관련
    users,
    
    // 상태 관련
    typeLoading,
    typeError,
    listLoading,
    listError,
  };
} 