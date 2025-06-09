import { ProjectCard } from "@/entities/project/ui/ProjectCard";

const dummyProjects = [
  {
    id: 1,
    title: "AI-Powered Recipe Generator",
    techStack: ["React", "Node.js", "OpenAI"],
    deadline: "2024-02-15",
    type: "side project",
    summary:
      "Generate personalized recipes based on dietary preferences and available ingredients.",
    recruitmentSummary:
      "Looking for passionate developers to build the next generation of AI-powered cooking assistance.",
    rolesNeeded: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
  },
  {
    id: 2,
    title: "Blockchain Voting System",
    techStack: ["Solidity", "Web3.js", "React"],
    deadline: "2024-02-16",
    type: "hackathon",
    summary:
      "Secure and transparent voting platform using blockchain technology.",
    recruitmentSummary:
      "Join us in revolutionizing democratic processes with blockchain technology.",
    rolesNeeded: ["Blockchain Developer", "Frontend Developer"],
  },
  {
    id: 3,
    title: "Mental Health Tracker",
    techStack: ["Flutter", "Firebase", "Python"],
    deadline: "2024-02-17",
    type: "competition",
    summary:
      "Mobile app to track mood patterns and provide mental health insights.",
    recruitmentSummary:
      "Help us create a meaningful impact on mental health awareness and support.",
    rolesNeeded: ["Mobile Developer", "Data Scientist", "UI/UX Designer"],
  },
  {
    id: 4,
    title: "Smart Home Dashboard",
    techStack: ["Vue.js", "IoT", "MongoDB"],
    deadline: "2024-02-18",
    type: "side project",
    summary: "Centralized dashboard to control and monitor smart home devices.",
    recruitmentSummary:
      "Building the future of home automation. Looking for IoT enthusiasts!",
    rolesNeeded: ["Frontend Developer", "IoT Developer"],
  },
  {
    id: 5,
    title: "Language Learning Game",
    techStack: ["Unity", "C#", "PostgreSQL"],
    deadline: "2024-02-19",
    type: "hackathon",
    summary:
      "Gamified language learning experience with interactive challenges.",
    recruitmentSummary:
      "Make language learning fun and engaging for millions of users worldwide.",
    rolesNeeded: ["Game Developer", "Backend Developer", "UI/UX Designer"],
  },
  {
    id: 6,
    title: "Carbon Footprint Calculator",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    deadline: "2024-02-20",
    type: "competition",
    summary:
      "Calculate and track personal carbon footprint with actionable insights.",
    recruitmentSummary:
      "Join the fight against climate change with data-driven solutions.",
    rolesNeeded: ["Full Stack Developer", "Data Scientist"],
  },
  {
    id: 7,
    title: "Virtual Study Groups",
    techStack: ["WebRTC", "React", "Socket.io"],
    deadline: "2024-02-21",
    type: "side project",
    summary: "Virtual study rooms with collaborative tools for students.",
    recruitmentSummary:
      "Create a virtual collaboration space for effective group study.",
    rolesNeeded: ["WebRTC Developer", "Frontend Developer"],
  },
];
export const Project = () => {
  return <ProjectCard projects={dummyProjects} />;
};
