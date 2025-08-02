import { UserSearchForm } from "@/components/UserSearchForm";
import { UserListContent } from "@/components/UserListContent";
import { useUserSearchPage } from "@/hooks/useUserSearchPage";

export default function UserPage() {
  const {
    userTypeOptions,
    selectedUserType,
    searchKeyword,
    effectiveKeyword,
    users,
    listLoading,
    listError,
    handleSelect,
    handleKeywordChange,
    handleSearch,
    handleSearchOnly,
  } = useUserSearchPage();

  return (
    <div className="w-full mx-auto text-left py-8 px-4 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">팀원 탐색</h1>
      </div>

      <UserSearchForm
        userTypeOptions={userTypeOptions}
        selectedUserType={selectedUserType}
        searchKeyword={searchKeyword}
        onSelect={handleSelect}
        onKeywordChange={handleKeywordChange}
        onSearch={handleSearch}
        onSearchOnly={handleSearchOnly}
      />

      <div>
        <UserListContent
          users={users}
          isLoading={listLoading}
          error={listError}
        />
      </div>
    </div>
  );
}
