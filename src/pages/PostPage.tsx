import { getGroupCode, type CodeResponse } from "@/apis/group";
import { MultiSelector } from "@/components/modules/Dropdown";
import { SearchBar } from "@/components/modules/SearchBar";
import { PostList } from "@/components/PostList";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function PostPage() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [projectOptions, setProjectOptions] = useState<CodeResponse[]>([]);

  useEffect(() => {
    getGroupCode("PROJECT_TYPE").then((res) => {
      if (res.success) setProjectOptions(res.data);
    });
  }, []);

  const handleSelect = (selected: string) => {
    setSelectedProjectType(selected);
  };

  return (
    <div className="w-full mx-auto text-left py-8 px-4 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">프로젝트 탐색</h1>
        {/* <p className="text-base text-gray-500">협업할 흥미로운 프로젝트 탐색</p> */}
      </div>

      <div className="flex items-start flex-wrap gap-4 mb-8">
        <MultiSelector
          rawOptions={projectOptions.map((option) => ({
            label: option.detailName,
            value: option.detailCode,
          }))}
          isOptionObject={true}
          isTotalDefault={false}
          value={selectedProjectType}
          onSelectOption={handleSelect}
        />
        <div className="flex gap-[12px]">
          <SearchBar className="w-[250px]" value={""} onChange={() => {}} />
          <Button backgroundColor="#015bd6" color="white">
            검색
          </Button>
        </div>
      </div>

      <div>
        <PostList />
      </div>
    </div>
  );
}
