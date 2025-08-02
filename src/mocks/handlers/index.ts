import { postsHandlers } from "./posts";
import { userHandlers } from "./users";
import { projectHandlers } from "./projects";
import { recruitmentHandlers } from "./recruitments";
import { http } from "msw";

export const handlers = [
  ...postsHandlers,
  ...userHandlers,
  ...projectHandlers,
  ...recruitmentHandlers,

  // 그룹 코드 핸들러
  http.get("/detail/codes", ({ request }) => {
    const url = new URL(request.url);
    const groupCode = url.searchParams.get("groupCode");

    if (groupCode === "PROJECT_TYPE") {
      return Response.json({
        success: true,
        data: [
          { detailCode: "SIDE_PROJECT", detailName: "사이드 프로젝트" },
          { detailCode: "STUDY", detailName: "스터디" },
          { detailCode: "CONTEST", detailName: "공모전" },
          { detailCode: "STARTUP", detailName: "스타트업" },
        ],
      });
    }

    return Response.json({
      success: true,
      data: [],
    });
  }),

  // 알림 핸들러
  http.get("/notifications", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    return Response.json({
      success: true,
      data: [
        {
          id: 1,
          title: "새로운 프로젝트 초대",
          content: "프로젝트에 초대되었습니다.",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "팀원 모집 완료",
          content: "팀원 모집이 완료되었습니다.",
          isRead: true,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }),
];
