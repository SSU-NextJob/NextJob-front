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
    const project_id = (data as any).project_id;
    if (!project_id) {
      return Response.json(
        { message: "project_id가 필요합니다." },
        { status: 400 }
      );
    }
    return Response.json({
      message: `user(${id})에게 프로젝트(${project_id})를 제안했습니다.`,
    });
  }),
];
