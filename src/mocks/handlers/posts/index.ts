import { http } from "msw";

export const postsHandlers = [
  http.get("/posts/:projectId", async ({ params }) => {
    const { projectId } = params;
    // PostDetailResponse 타입에 맞는 mock 데이터
    const mockProject = {
      post_id: Number(projectId),
      title: "AI 챗봇 개발 모집 공고",
      content: "AI 챗봇 개발자를 모집합니다. 자연어 처리에 관심 있는 분 환영!",
      role_type: "프론트엔드",
      create_at: new Date("2024-02-20"),
      user_id: 1,
      user_name: "홍길동",
      project: {
        projectId: 1,
        name: "AI 챗봇 개발 프로젝트",
        content: "Python과 TensorFlow를 사용한 자연어 처리 챗봇 개발",
        type: "사이드 프로젝트",
        start_at: new Date("2024-03-01"),
        end_at: new Date("2024-05-01"),
        image: "https://placehold.co/400x300?text=Project+Image",
      },
    };
    return Response.json({
      success: true,
      data: mockProject,
    });
  }),
];
