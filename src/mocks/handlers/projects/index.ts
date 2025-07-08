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
];
