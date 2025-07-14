import { http } from "msw";

export const recruitmentHandlers = [
  http.post("/posts/insert", async ({ request }) => {
    const body = await request.json();
    const data = typeof body === "object" && body !== null ? body : {};
    return Response.json({
      message: "모집 공고가 성공적으로 생성되었습니다.",
      project: {
        id: Math.floor(Math.random() * 10000),
        ...data,
      },
    });
  }),
];
