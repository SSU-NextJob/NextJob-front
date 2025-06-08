import "./ProjectCard.css";

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
    <div className="project-grid">
      {projects.map((project) => {
        const daysLeft = Math.ceil(
          (new Date(project.deadline).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        );

        const badgeClass =
          project.type === "hackathon"
            ? "badge badge-blue"
            : project.type === "competition"
              ? "badge badge-red"
              : "badge badge-gray";

        return (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <span className={badgeClass}>{project.type}</span>
              <span className="project-deadline">
                {new Date(project.deadline).toLocaleDateString()}
              </span>
            </div>

            <h2 className="project-title">{project.title}</h2>
            <p className="project-summary">{project.summary}</p>

            <div className="label">Recruitment Summary</div>
            <p className="truncate">{project.recruitmentSummary}</p>

            <div className="label">Roles Needed</div>
            <div className="role-tags">
              {project.rolesNeeded.slice(0, 2).map((role) => (
                <span key={role} className="chip">
                  {role}
                </span>
              ))}
              {project.rolesNeeded.length > 2 && (
                <span className="chip">+{project.rolesNeeded.length - 2}</span>
              )}
            </div>

            <div className="label">Tech Stack</div>
            <div className="project-tech">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-footer">
              <span>🕒 {daysLeft} days left</span>
              <span>👥 4 spots</span>
              <button className="apply-btn">Apply</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
