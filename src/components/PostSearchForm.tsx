import { MultiSelector } from "@/components/modules/Dropdown";
import { SearchBar } from "@/components/modules/SearchBar";
import { Button } from "@chakra-ui/react";
import { type CodeResponse } from "@/apis/group";

interface PostSearchFormProps {
  projectOptions: CodeResponse[];
  selectedProjectType: string;
  searchKeyword: string;
  onSelect: (selected: string) => void;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onSearchOnly: () => void;
}

export function PostSearchForm({
  projectOptions,
  selectedProjectType,
  searchKeyword,
  onSelect,
  onKeywordChange,
  onSearch,
  onSearchOnly,
}: PostSearchFormProps) {
  return (
    <div className="flex items-start flex-wrap gap-4 mb-8">
      <MultiSelector
        rawOptions={projectOptions.map((option) => ({
          label: option.detailName,
          value: option.detailCode,
        }))}
        isOptionObject={true}
        isTotalDefault={false}
        value={selectedProjectType}
        onSelectOption={onSelect}
      />
      <div className="flex gap-[12px]">
        <SearchBar
          className="w-[250px]"
          value={searchKeyword}
          onChange={onKeywordChange}
          onEnter={onSearchOnly}
          placeholder="프로젝트명 검색"
        />
        <Button backgroundColor="#015bd6" color="white" onClick={onSearch}>
          검색
        </Button>
      </div>
    </div>
  );
}
