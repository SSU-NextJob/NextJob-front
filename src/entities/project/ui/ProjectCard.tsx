interface Project {
  id: number;
  title: string;
  techStack: string[];
  deadline: string;
  type: string;
  summary: string;
  recruitmentSummary: string;
  rolesNeeded: string[];
}

export const ProjectCard = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <div className="w-full px-8 py-12 bg-white">
        <div className="max-w-[1440px] mx-auto text-white grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => {
            const daysLeft = Math.ceil(
              (new Date(project.deadline).getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            );

            const badgeColor =
              project.type === "hackathon"
                ? "bg-blue-600"
                : project.type === "competition"
                  ? "bg-red-600"
                  : "bg-gray-500";

            return (
              <div
                key={project.id}
                className="bg-red border border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize text-white ${badgeColor">
                    {project.type}
                  </span>
                  <span>
                    {new Date(project.deadline).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 mb-1 leading-snug">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3 leading-normal">
                  {project.summary}
                </p>

                {/* Recruitment Summary */}
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Recruitment Summary
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-snug line-clamp-2">
                  {project.recruitmentSummary}
                </p>

                {/* Roles */}
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Roles Needed
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.rolesNeeded.slice(0, 2).map((role, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                  {project.rolesNeeded.length > 2 && (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      +{project.rolesNeeded.length - 2}
                    </span>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4">
                  <span>🕒 {daysLeft} days left</span>
                  <span>👥 4 spots</span>
                  <button className="ml-auto border border-gray-300 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                    Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
