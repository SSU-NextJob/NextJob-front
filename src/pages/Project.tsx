import { MultiSelector } from "@/shared/ui/atoms/Dropdown";
import { SearchBar } from "@/shared/ui/atoms/SearchBar";
import { Project } from "@/widgets/ProjectPage/ui/Project";

export default function ProjectPage() {
  const handleSelect = (selected: string[]) => {
    console.log("선택된 값:", selected);
  };

  const dummyOptions = ["React", "Node.js", "Python", "Vue", "TypeScript"];

  return (
    <div className="w-screen h-[calc(100vh-100px)] mx-auto text-left px-4 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Project Explore
        </h1>
        <p className="text-base text-gray-500">
          Discover exciting projects to collaborate on
        </p>
      </div>

      <div className="flex items-start flex-wrap gap-4 mb-8">
        <MultiSelector
          rawOptions={dummyOptions}
          isTotalDefault={false}
          onSelectOptions={handleSelect}
        />
        <SearchBar />
      </div>

      <div>
        <Project />
      </div>
    </div>
  );
}
