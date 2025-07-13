import { http } from "msw";

export const userHandlers = [
  http.get("/users", () => {
    return Response.json({
      success: true,
      data: userListData
    });
  }),
  http.get("/users/:userId", ({ params }: any) => {
    const { userId } = params;

    return Response.json({
      success: true,
      data: {
        userId: userId,
        name: "홍길동",
        email: "hong@example.com",
        description: "안녕하세요, 프론트엔드 개발자입니다.",
        techStack: "React,TypeScript",
        profileImage: "https://via.placeholder.com/100",
        userType: "frontend",
        isVisible: true,
      }
    });
  }),
  http.get("/projects", () => {

    return Response.json({
      success: true,
      data: UserProjectData
    });
  }),
];



const userListData = [
  {
    userId: 1,
    name: "홍길동",
    email: "hong@example.com",
    description: "안녕하세요, 프론트엔드 개발자입니다.",
    techStack: "React,TypeScript",
    profileImage: "https://via.placeholder.com/100",
    userType: "frontend",
    isVisible: true,
  },
  {
    userId: 2,
    name: "김개발",
    email: "kim@example.com",
    description: "안녕하세요,백엔드 개발자입니다.",
    techStack: null,
    profileImage: "https://via.placeholder.com/100",
    userType: "backend",
    isVisible: false,
  },
  {
    userId: 3,
    name: "이디자이너",
    email: "lee@example.com",
    description: "UI/UX 디자인을 전공했습니다.",
    techStack: "Figma, Photoshop",
    profileImage: "https://via.placeholder.com/100",
    userType: "designer",
    isVisible: true,
  },
  {
    userId: 4,
    name: "홍길동",
    email: "hong@example.com",
    description: "안녕하세요, 프론트엔드 개발자입니다.",
    techStack: "React,TypeScript",
    profileImage: "https://via.placeholder.com/100",
    userType: "frontend",
    isVisible: true,
  },
  {
    userId: 5,
    name: "김개발",
    email: "kim@example.com",
    description: "안녕하세요,백엔드 개발자입니다.",
    techStack: null,
    profileImage: "https://via.placeholder.com/100",
    userType: "backend",
    isVisible: false,
  },
  {
    userId: 6,
    name: "이디자이너",
    email: "lee@example.com",
    description: "UI/UX 디자인을 전공했습니다.",
    techStack: "Figma, Photoshop",
    profileImage: "https://via.placeholder.com/100",
    userType: "designer",
    isVisible: true,
  },
];

const UserProjectData = {
  createdProject: [
    {
      projectId: 1,
      name: "AI 채용 플랫폼",
      type: "해커톤",
      content: "AI를 활용한 인재 추천 및 채용 자동화 플랫폼 개발",
      startAt: "2024-11-01",
      endAt: "2025-03-15",
    },
  ],
  participationProject: [
    {
      project_id: 101,
      name: "IoT 스마트팜",
      type: "해커톤",
      content: "센서를 활용한 자동 온습도 관리 시스템",
      startAt: "2024-10-01",
      endAt: "2025-01-31",
    },
    {
      project_id: 102,
      name: "블록체인 투표 시스템",
      type: "사이드 프로젝트",
      content: "투명하고 신뢰할 수 있는 온라인 투표 플랫폼",
      startAt: "2024-09-15",
      endAt: "2025-02-28",
    },
  ],
}