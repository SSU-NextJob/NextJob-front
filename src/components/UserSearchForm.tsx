import { MultiSelector } from "@/components/modules/Dropdown";
import { SearchBar } from "@/components/modules/SearchBar";
import { Button } from "@chakra-ui/react";
import type { CodeResponse } from "@/apis/group";

interface UserSearchFormProps {
  userTypeOptions: CodeResponse[];
  selectedUserType: string;
  searchKeyword: string;
  onSelect: (selected: string) => void;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  onSearchOnly?: () => void; // Enter 키용
}

export const UserSearchForm = ({
  userTypeOptions,
  selectedUserType,
  searchKeyword,
  onSelect,
  onKeywordChange,
  onSearch,
  onSearchOnly,
}: UserSearchFormProps) => {
  return (
    <div className="flex items-start flex-wrap gap-4 mb-8">
      <MultiSelector
        rawOptions={userTypeOptions.map((option) => ({
          label: option.detailName,
          value: option.detailCode,
        }))}
        isOptionObject={true}
        isTotalDefault={false}
        value={selectedUserType}
        onSelectOption={onSelect}
      />
      <div className="flex gap-[12px]">
        <SearchBar
          className="w-[250px]"
          value={searchKeyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onEnter={onSearchOnly || onSearch}
          placeholder="팀원명 검색"
        />
        <Button
          backgroundColor="#015bd6"
          color="white"
          onClick={onSearch}
        >
          검색
        </Button>
      </div>
    </div>
  );
}; 