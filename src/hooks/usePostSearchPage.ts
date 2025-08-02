import { getGroupCode, type CodeResponse } from "@/apis/group";
import { getPostList, type PostResponse } from "@/apis/post";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

export function usePostSearchPage() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [projectOptions, setProjectOptions] = useState<CodeResponse[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchParams, setSearchParams] = useState<{
    status: string;
    keyword: string;
  }>({
    status: "",
    keyword: "",
  });

  // PostList 관련 상태
  const [postList, setPostList] = useState<PostResponse[]>([]);
  const [listError, setListError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  useEffect(() => {
    getGroupCode("PROJECT_TYPE").then((res) => {
      if (res.success) setProjectOptions(res.data);
    });
  }, []);

  // PostList 데이터 fetching
  useEffect(() => {
    loadingStore.setLoading("postList", true);
    setListError(null);

    getPostList({
      type: searchParams.status,
      role: "",
      search: searchParams.keyword,
      page: "1",
      pageSize: "10",
    })
      .then((res) => {
        if (res.success) {
          setPostList(res.data);
        } else {
          setListError("데이터를 불러오지 못했습니다.");
        }
      })
      .catch(() => {
        setListError("데이터를 불러오지 못했습니다.");
      })
      .finally(() => loadingStore.setLoading("postList", false));
  }, [searchParams.status, searchParams.keyword]);

  const handleSelect = (selected: string) => {
    setSelectedProjectType(selected);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({
      status: selectedProjectType,
      keyword: searchKeyword,
    });
  };

  const handleSearchOnly = () => {
    setSearchParams({
      status: "",
      keyword: searchKeyword,
    });
  };

  return {
    projectOptions,
    selectedProjectType,
    searchKeyword,
    postList,
    listLoading: loadingStore.isLoading("postList"),
    listError,
    handleSelect,
    handleKeywordChange,
    handleSearch,
    handleSearchOnly,
  };
}
