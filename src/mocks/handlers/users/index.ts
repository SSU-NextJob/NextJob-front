import { http } from "msw";

export const userHandlers = [
  http.get("/api/users/:userId", ({ params }) => {
    const { userId } = params;

    return Response.json({
      id: userId,
      name: "홍길동",
      email: "hong@example.com",
    });
  }),
];
