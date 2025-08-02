import { useState, useCallback } from "react";

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