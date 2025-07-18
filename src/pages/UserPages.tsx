import { MultiSelector } from "@/components/modules/Dropdown";
import { SearchBar } from "@/components/modules/SearchBar";
import { UserList } from "@/components/UserList";
import { Button } from "@chakra-ui/react";
import { getGroupCode, type CodeResponse } from "@/apis/group";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [userTypeOptions, setUserTypeOptions] = useState<CodeResponse[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchParams, setSearchParams] = useState<{ userType: string; keyword: string }>({
    userType: "",
    keyword: "",
  });


  useEffect(() => {
    getGroupCode("USER_TYPE").then((res) => {
      if (res.success) setUserTypeOptions(res.data);
    });
  }, []);

  const handleSelect = (selected: string) => {
    setSelectedUserType(selected);
  };

  const handleSearch = () => {
    console.log(selectedUserType, searchKeyword);
    setSearchParams({
      userType: selectedUserType,
      keyword: searchKeyword,
    });
  };

  return (
    <div className="w-full mx-auto text-left py-8 px-4 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">팀원 탐색</h1>
        {/* <p className="text-base text-gray-500">협업할 흥미로운 프로젝트 탐색</p> */}
      </div>

      <div className="flex items-start flex-wrap gap-4 mb-8">
        <MultiSelector
          rawOptions={userTypeOptions.map((option) => ({
            label: option.detailName,
            value: option.detailCode,
          }))}
          isOptionObject={true}
          isTotalDefault={false}
          value={selectedUserType}
          onSelectOption={handleSelect}
        />
        <div className="flex gap-[12px]">
          <SearchBar className="w-[250px]" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          <Button backgroundColor="#015bd6" color="white" onClick={handleSearch}>
            검색
          </Button>
        </div>
      </div>

      <div>
        <UserList userType={searchParams.userType} keyword={searchParams.keyword}/>
      </div>
    </div>
  );
}
