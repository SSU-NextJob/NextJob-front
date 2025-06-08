import "./Project.css";
import { MultiSelector } from "@/shared/ui/atoms/Dropdown";
import { SearchBar } from "@/shared/ui/atoms/SearchBar";
import { ProjectList } from "@/widgets/ProjectList/ui/ProjectList";

export default function ProjectPage() {
  const handleSelect = (selected: string[]) => {
    console.log("선택된 값:", selected);
  };

  const dummyOptions = ["React", "Node.js", "Python", "Vue", "TypeScript"];

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Project Explore</h1>
        <p>Discover exciting projects to collaborate on</p>
      </div>

      <div className="filter-bar">
        <MultiSelector
          rawOptions={dummyOptions}
          isTotalDefault={false}
          onSelectOptions={handleSelect}
        />
        <SearchBar />
      </div>

      <div>
        <ProjectList />
      </div>
    </div>
  );
}
