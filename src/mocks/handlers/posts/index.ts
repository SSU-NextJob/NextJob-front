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

  // 조건부 에러 테스트용 핸들러
  http.get("/posts", ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    // 다양한 에러 시나리오 테스트
    if (search === "error") {
      return Response.json({
        success: false,
        data: null,
        error: {
          code: 40400,
          message: "찾을 수 없습니다.",
        },
      });
    }

    if (search === "unauthorized") {
      return Response.json({
        success: false,
        data: null,
        error: {
          code: 40100,
          message: "권한이 없습니다.",
        },
      });
    }

    if (search === "server_error") {
      return Response.json({
        success: false,
        data: null,
        error: {
          code: 50000,
          message: "서버 오류가 발생했습니다.",
        },
      });
    }

    // 정상 응답
    return Response.json({
      success: true,
      data: [
        {
          postId: 1,
          title: "프로젝트 1",
          roleType: "프론트엔드",
          createAt: new Date(),
          userId: 1,
          userName: "홍길동",
          project: {
            projectId: 1,
            projectName: "프로젝트 1",
            type: "사이드 프로젝트",
            startAt: new Date(),
            endAt: new Date(),
          },
        },
      ],
    });
  }),
];
