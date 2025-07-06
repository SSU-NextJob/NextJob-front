import { MultiSelector } from "@/shared/ui/modules/Dropdown";
import { SearchBar } from "@/shared/ui/modules/SearchBar";
import { UserList } from "@/widgets/UserList/ui/User";

export default function UserPage() {
  const handleSelect = (selected: string[]) => {
    console.log("선택된 값:", selected);
  };

  const dummyOptions = ["React", "Node.js", "Python", "Vue", "TypeScript"];

  return (
    <div className="w-full mx-auto text-left py-8 px-4 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">팀원 탐색</h1>
        {/* <p className="text-base text-gray-500">협업할 흥미로운 프로젝트 탐색</p> */}
      </div>

      <div className="flex items-start flex-wrap gap-4 mb-8">
        <MultiSelector
          rawOptions={dummyOptions}
          isTotalDefault={false}
          onSelectOptions={handleSelect}
        />
        <SearchBar value={""} onChange={() => {}} />
      </div>

      <div>
        <UserList />
      </div>
    </div>
  );
}
