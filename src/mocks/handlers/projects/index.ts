import { http } from "msw";

export const projectHandlers = [
  http.post("/projects/insert", async ({ request }) => {
    const body = await request.json();
    const data = typeof body === "object" && body !== null ? body : {};
    return Response.json({
      message: "프로젝트가 성공적으로 생성되었습니다.",
      project: {
        id: Math.floor(Math.random() * 10000),
        ...data,
      },
    });
  }),
  http.post("/projects/:id/apply", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const data = typeof body === "object" && body !== null ? body : {};
    const user_id = (data as any).user_id;
    if (!user_id) {
      return Response.json(
        { message: "user_id가 필요합니다." },
        { status: 400 }
      );
    }
    return Response.json({
      message: `프로젝트(${id})에 user(${user_id})가 지원 완료되었습니다.`,
    });
  }),
  http.post("/users/:id/suggest", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const data = typeof body === "object" && body !== null ? body : {};
    const projectId = (data as any).projectId;
    if (!projectId) {
      return Response.json(
        { message: "projectId가 필요합니다." },
        { status: 400 }
      );
    }
    return Response.json({
      message: `user(${id})에게 프로젝트(${projectId})를 제안했습니다.`,
    });
  }),
  http.get("/users/:id/projects", async ({ params }) => {
    const { id } = params;

    if (!id) {
      return Response.json(
        { message: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    // Mock 프로젝트 데이터
    const mockProjects = [
      {
        projectId: 1,
        name: "웹 개발 프로젝트",
        content: "React와 Node.js를 사용한 풀스택 웹 애플리케이션 개발",
        type: "웹 개발",
        start_at: new Date("2024-01-15"),
        end_at: new Date("2024-03-15"),
      },
      {
        projectId: 2,
        name: "모바일 앱 개발",
        content: "React Native를 사용한 크로스 플랫폼 모바일 앱 개발",
        type: "모바일 개발",
        start_at: new Date("2024-02-01"),
        end_at: new Date("2024-04-01"),
      },
      {
        projectId: 3,
        name: "AI 챗봇 개발",
        content: "Python과 TensorFlow를 사용한 자연어 처리 챗봇 개발",
        type: "AI/ML",
        start_at: new Date("2024-03-01"),
        end_at: new Date("2024-05-01"),
      },
    ];

    return Response.json({
      success: true,
      data: mockProjects,
    });
  }),
  http.get("/projects", async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { message: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    // Mock 데이터: 내가 생성한 프로젝트와 참여한 프로젝트 구분
    const createdProject = [
      {
        projectId: 1,
        name: "내가 만든 웹 프로젝트",
        content: "React와 Node.js로 만든 웹 서비스",
        type: "웹 개발",
        start_at: new Date("2024-01-01"),
        end_at: new Date("2024-03-01"),
      },
    ];
    const participationProject = [
      {
        projectId: 2,
        name: "참여한 모바일 앱 프로젝트",
        content: "React Native로 만든 앱",
        type: "모바일 개발",
        start_at: new Date("2024-02-01"),
        end_at: new Date("2024-04-01"),
      },
      {
        projectId: 3,
        name: "참여한 AI 프로젝트",
        content: "TensorFlow로 만든 챗봇",
        type: "AI/ML",
        start_at: new Date("2024-03-01"),
        end_at: new Date("2024-05-01"),
      },
    ];

    return Response.json({
      success: true,
      data: {
        createdProject,
        participationProject,
      },
    });
  }),
];
