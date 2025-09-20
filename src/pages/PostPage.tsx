import { PostSearchForm } from "@/components/PostSearchForm";
import { PostList } from "@/components/PostList";
import { usePostSearchPage } from "@/hooks/usePostSearchPage";

export default function PostPage() {
  const {
    projectOptions,
    selectedProjectType,
    searchKeyword,
    postList,
    listLoading,
    listError,
    handleSelect,
    handleKeywordChange,
    handleSearch,
    handleSearchOnly,
  } = usePostSearchPage();

  return (
    <div className="min-h-screen w-full mx-auto text-left py-8 px-4 md:px-8 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">프로젝트 탐색</h1>
        {/* <p className="text-base text-gray-500">협업할 흥미로운 프로젝트 탐색</p> */}
      </div>

      <PostSearchForm
        projectOptions={projectOptions}
        selectedProjectType={selectedProjectType}
        searchKeyword={searchKeyword}
        onSelect={handleSelect}
        onKeywordChange={handleKeywordChange}
        onSearch={handleSearch}
        onSearchOnly={handleSearchOnly}
      />

      <div>
        <PostList posts={postList} isLoading={listLoading} error={listError} />
      </div>
    </div>
  );
}
