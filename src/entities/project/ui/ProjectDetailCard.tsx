import React from "react";
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
export const ProjectDetailCard = ({ projects }: { projects: Project[] }) => {
  const project = {
    title: "Blockchain Voting System",
    deadline: "2024. 1. 30.",
    location: "San Francisco, CA",
    membersNeeded: 3,
    type: "hackathon",
    description:
      "A decentralized voting platform that ensures transparency, security, and immutability of election results using blockchain technology.",
    recruitmentSummary:
      "Join us in revolutionizing democratic processes with blockchain technology.",
    roles: ["Blockchain Developer", "Frontend Developer"],
    techStack: ["Solidity", "Web3.js", "React"],
    requirements: [
      "Experience with Solidity",
      "Web3 development knowledge",
      "React proficiency",
    ],
    benefits: [
      "Hackathon prize potential",
      "Blockchain expertise",
      "Networking opportunities",
    ],
    creator: "Sarah Chen",
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {project.type}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
        <span>🗓️ Deadline: {project.deadline}</span>
        <span>🌍 {project.location}</span>
        <span>👥 {project.membersNeeded} team members needed</span>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Project Description
        </h2>
        <p className="text-sm text-gray-700">{project.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Recruitment Summary
        </h2>
        <p className="text-sm text-gray-700">{project.recruitmentSummary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Roles Needed
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.roles.map((role) => (
            <span
              key={role}
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Requirements
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {project.requirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Benefits</h2>
        <div className="flex flex-wrap gap-2">
          {project.benefits.map((b) => (
            <span
              key={b}
              className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-6">
        <div className="font-semibold text-gray-800">Project Creator</div>
        {project.creator}
      </div>

      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md">
          Apply for Project
        </button>
      </div>
    </div>
  );
};
