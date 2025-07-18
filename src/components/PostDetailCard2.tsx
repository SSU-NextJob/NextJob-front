"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code,
} from "lucide-react";
import Link from "next/link";

// Sample recruitment posts data
const recruitmentPosts = [
  {
    id: 1,
    title: "AI Recipe Generator Team",
    summary:
      "Looking for passionate developers to build AI-powered cooking assistance",
    description:
      "We're building an innovative AI-powered recipe generator that creates personalized recipes based on user preferences, dietary restrictions, and available ingredients. This project combines cutting-edge AI technology with practical everyday use. The platform will feature a modern React frontend, robust Node.js backend, and integration with OpenAI's GPT models for recipe generation.",
    projectId: 1,
    projectName: "AI Recipe Generator",
    type: "side project",
    rolesNeeded: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
    deadline: "2024-03-15",
    applicantCount: 8,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Task Management Platform",
    summary: "Building a collaborative task management platform for teams",
    description:
      "Join us in creating a next-generation task management platform that helps teams collaborate more effectively. We're focusing on intuitive design, real-time collaboration, and powerful automation features. The platform will include project tracking, team communication, and advanced reporting capabilities.",
    projectId: 2,
    projectName: "Task Management App",
    type: "hackathon",
    rolesNeeded: ["Full Stack Developer", "UI/UX Designer", "Product Manager"],
    deadline: "2024-04-01",
    applicantCount: 12,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Weather Dashboard Development",
    summary:
      "Real-time weather monitoring system with beautiful visualizations",
    description:
      "We're creating a comprehensive weather dashboard that provides real-time weather data with stunning visualizations. The platform will feature interactive maps, detailed forecasts, and customizable alerts. Users will be able to track weather patterns, set location-based notifications, and access historical weather data.",
    projectId: null,
    projectName: null,
    type: "side project",
    rolesNeeded: ["Frontend Developer", "Data Scientist", "UI/UX Designer"],
    deadline: "2024-02-28",
    applicantCount: 5,
    createdAt: "2024-01-10",
  },
];

// Sample applicants data
const applicantsData = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Frontend Developer",
    intro:
      "Passionate frontend developer with expertise in React and modern web technologies",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    experience: "3+ years",
    availability: "Part-time",
    email: "alex.rodriguez@email.com",
    phone: "+1 (555) 123-4567",
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "New York University",
        year: "2019-2023",
        gpa: "3.8/4.0",
      },
    ],
    workExperience: [
      {
        title: "Frontend Developer",
        company: "TechStart Inc.",
        duration: "2023 - Present",
        description:
          "Developed responsive web applications using React and TypeScript.",
      },
    ],
    pastProjects: [
      {
        id: 1,
        name: "E-commerce Dashboard",
        role: "Lead Frontend Developer",
        duration: "3 months",
        description:
          "Built a comprehensive admin dashboard for an e-commerce platform.",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "UI/UX Designer",
    intro:
      "Creative designer focused on user-centered design and accessibility",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
    experience: "4+ years",
    availability: "Full-time",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 234-5678",
    education: [
      {
        degree: "Bachelor of Fine Arts in Graphic Design",
        school: "California College of the Arts",
        year: "2018-2022",
        gpa: "3.9/4.0",
      },
    ],
    workExperience: [
      {
        title: "Senior UI/UX Designer",
        company: "Design Studio Pro",
        duration: "2022 - Present",
        description:
          "Led design projects for various startups and established companies.",
      },
    ],
    pastProjects: [
      {
        id: 1,
        name: "Mobile Banking App",
        role: "Lead Designer",
        duration: "6 months",
        description:
          "Designed user interface for a secure mobile banking application.",
      },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    role: "Backend Developer",
    intro:
      "Experienced backend developer specializing in scalable systems and APIs",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
    experience: "5+ years",
    availability: "Part-time",
    email: "david.kim@email.com",
    phone: "+1 (555) 345-6789",
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "University of Washington",
        year: "2017-2019",
        gpa: "3.7/4.0",
      },
    ],
    workExperience: [
      {
        title: "Senior Backend Developer",
        company: "CloudTech Solutions",
        duration: "2020 - Present",
        description:
          "Built scalable backend systems serving millions of users.",
      },
    ],
    pastProjects: [
      {
        id: 1,
        name: "API Gateway Platform",
        role: "Lead Backend Developer",
        duration: "8 months",
        description:
          "Developed a comprehensive API gateway for microservices architecture.",
      },
    ],
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    intro:
      "Versatile developer with experience in both frontend and backend technologies",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    experience: "4+ years",
    availability: "Full-time",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 456-7890",
    education: [
      {
        degree: "Bachelor of Science in Software Engineering",
        school: "University of Texas at Austin",
        year: "2018-2022",
        gpa: "3.6/4.0",
      },
    ],
    workExperience: [
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2022 - Present",
        description:
          "Developed end-to-end web applications using modern tech stack.",
      },
    ],
    pastProjects: [
      {
        id: 1,
        name: "Social Media Platform",
        role: "Full Stack Developer",
        duration: "10 months",
        description:
          "Built a complete social media platform with real-time features.",
      },
    ],
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Frontend Developer",
    intro:
      "Frontend specialist with a passion for creating beautiful user interfaces",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Vue.js", "React", "CSS", "JavaScript"],
    experience: "3+ years",
    availability: "Part-time",
    email: "michael.chen@email.com",
    phone: "+1 (555) 567-8901",
    education: [
      {
        degree: "Bachelor of Science in Web Development",
        school: "UCLA Extension",
        year: "2019-2021",
        gpa: "3.8/4.0",
      },
    ],
    workExperience: [
      {
        title: "Frontend Developer",
        company: "WebDev Agency",
        duration: "2021 - Present",
        description:
          "Created responsive websites and web applications for various clients.",
      },
    ],
    pastProjects: [
      {
        id: 1,
        name: "E-learning Platform",
        role: "Frontend Developer",
        duration: "5 months",
        description:
          "Developed interactive learning modules and student dashboard.",
      },
    ],
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Product Manager",
    intro:
      "Strategic product manager with experience in agile development and user research",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Product Strategy", "Agile", "User Research", "Analytics"],
    experience: "6+ years",
    availability: "Full-time",
    email: "emily.davis@email.com",
    phone: "+1 (555) 678-9012",
    education: [
      {
        degree: "MBA in Technology Management",
        school: "Northwestern Kellogg",
        year: "2016-2018",
        gpa: "3.9/4.0",
      },
    ],
    workExperience: [
      {
        title: "Senior Product Manager",
        company: "TechCorp Inc.",
        duration: "2019 - Present",
        description:
          "Led product development for B2B SaaS platform with 100k+ users.",
      },
    ],
    pastProjects: [
      {
        id: 1,
        name: "Analytics Dashboard",
        role: "Product Manager",
        duration: "12 months",
        description: "Managed development of comprehensive analytics platform.",
      },
    ],
  },
];

export default function RecruitmentDetailPage() {
  const params = useParams();
  const recruitmentId = Number.parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState("project-info");
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);

  const recruitmentPost = recruitmentPosts.find(
    (post) => post.id === recruitmentId
  );

  if (!recruitmentPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Recruitment Post Not Found
          </h1>
          <Link href="/my-page">
            <Button>Back to My Page</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleApplicantClick = (applicant: any) => {
    setSelectedApplicant(applicant);
    setApplicantModalOpen(true);
  };

  const handleAcceptApplicant = () => {
    console.log(`Accepted applicant: ${selectedApplicant?.name}`);
    setApplicantModalOpen(false);
    setSelectedApplicant(null);
  };

  const handleRejectApplicant = () => {
    console.log(`Rejected applicant: ${selectedApplicant?.name}`);
    setApplicantModalOpen(false);
    setSelectedApplicant(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/my-page">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Page
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {recruitmentPost.title}
          </h1>
          <p className="text-muted-foreground">{recruitmentPost.summary}</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("project-info")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "project-info"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Project Info
              </button>
              <button
                onClick={() => setActiveTab("applicants")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "applicants"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Applicants ({recruitmentPost.applicantCount})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "project-info" && (
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Recruitment Title</h3>
                  <p className="text-muted-foreground">
                    {recruitmentPost.title}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Project Type</h3>
                  <Badge
                    variant={
                      recruitmentPost.type === "hackathon"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {recruitmentPost.type}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">One-line Summary</h3>
                <p className="text-muted-foreground">
                  {recruitmentPost.summary}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {recruitmentPost.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Roles Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {recruitmentPost.rolesNeeded.map((role, index) => (
                    <Badge key={index} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Deadline</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(recruitmentPost.deadline).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Linked Project</h3>
                  {recruitmentPost.projectName ? (
                    <Badge variant="outline">
                      {recruitmentPost.projectName}
                    </Badge>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No linked project
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "applicants" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicantsData.slice(0, 9).map((applicant) => (
                <Card
                  key={applicant.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleApplicantClick(applicant)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={applicant.avatar || "/placeholder.svg"}
                          alt={applicant.name}
                        />
                        <AvatarFallback>
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight truncate">
                          {applicant.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {applicant.role}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3 line-clamp-2">
                      {applicant.intro}
                    </CardDescription>
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      {applicant.location}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {applicant.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {applicant.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{applicant.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{applicant.experience}</span>
                      <span>{applicant.availability}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Applicant Detail Modal */}
      <Dialog open={applicantModalOpen} onOpenChange={setApplicantModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApplicant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Applicant Profile</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={selectedApplicant.avatar || "/placeholder.svg"}
                      alt={selectedApplicant.name}
                    />
                    <AvatarFallback className="text-xl">
                      {selectedApplicant.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">
                      {selectedApplicant.name}
                    </h2>
                    <p className="text-lg text-primary font-medium mb-2">
                      {selectedApplicant.role}
                    </p>
                    <p className="text-muted-foreground mb-3">
                      {selectedApplicant.intro}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedApplicant.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {selectedApplicant.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {selectedApplicant.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant.skills.map(
                      (skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <div className="space-y-4">
                    {selectedApplicant.education.map(
                      (edu: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{edu.degree}</h4>
                                <p className="text-muted-foreground">
                                  {edu.school}
                                </p>
                              </div>
                              <div className="text-right text-sm text-muted-foreground">
                                <p>{edu.year}</p>
                                <p>{edu.gpa}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                  </div>
                  <div className="space-y-4">
                    {selectedApplicant.workExperience.map(
                      (exp: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{exp.title}</h4>
                                <p className="text-primary font-medium">
                                  {exp.company}
                                </p>
                              </div>
                              <Badge variant="outline">{exp.duration}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                </div>

                {/* Past Projects */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Past Projects</h3>
                  <div className="space-y-4">
                    {selectedApplicant.pastProjects.map(
                      (project: any, index: number) => (
                        <Card key={index}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">
                                  {project.name}
                                </CardTitle>
                                <p className="text-sm text-primary font-medium">
                                  {project.role}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {project.duration}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {project.description}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleRejectApplicant}
                  >
                    Reject
                  </Button>
                  <Button className="flex-1" onClick={handleAcceptApplicant}>
                    Accept
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
