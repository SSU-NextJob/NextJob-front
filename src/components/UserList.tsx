// import { UserCard } from "@/components/UserCard";

// const members = [
//   {
//     userId: 1,
//     name: "Sarah Chen",
//     role: "풀스택 개발자",
//     description: "확장 가능한 웹 앱과 AI 통합을 구축하는 데 열정이 있습니다.",
//     location: "샌프란시스코, CA",
//     skills: ["React", "Node.js", "Python"],
//   },
//   {
//     userId: 2,
//     name: "Alex Rodriguez",
//     role: "UI/UX 디자이너",
//     description:
//       "모바일과 웹을 위한 직관적이고 아름다운 사용자 경험을 만듭니다.",
//     location: "뉴욕, NY",
//     skills: ["Figma", "Sketch", "Prototyping"],
//   },
//   {
//     userId: 3,
//     name: "Michael Kim",
//     role: "백엔드 개발자",
//     description: "머신러닝과 분석을 통해 데이터에서 통찰력을 도출합니다.",
//     location: "시애틀, WA",
//     skills: ["Python", "TensorFlow", "SQL"],
//   },
//   {
//     userId: 4,
//     name: "Emily Johnson",
//     role: "프론트엔드 개발자",
//     description: "사용자 요구와 기술적 솔루션 간의 격차를 해소합니다.",
//     location: "오스틴, TX",
//     skills: ["Product Strategy", "Agile", "Analytics"],
//   },
//   {
//     userId: 5,
//     name: "David Park",
//     role: "디자이너",
//     description: "신뢰성 있고 확장 가능한 인프라스트럭처 자동화에 집중합니다.",
//     location: "덴버, CO",
//     skills: ["Docker", "Kubernetes", "AWS"],
//   },
//   {
//     userId: 6,
//     name: "Lisa Wang",
//     role: "프론트엔드 개발자",
//     description: "크로스 플랫폼 모바일 앱을 개발합니다.",
//     location: "로스앤젤레스, CA",
//     skills: ["React Native", "Swift", "Kotlin"],
//   },
//   {
//     userId: 7,
//     name: "James Wilson",
//     role: "백엔드 개발자",
//     description: "견고한 API 및 서버 아키텍처를 설계합니다.",
//     location: "시카고, IL",
//     skills: ["Java", "Spring Boot", "PostgreSQL"],
//   },
//   {
//     userId: 8,
//     name: "Maria Garcia",
//     role: "프론트엔드 개발자",
//     description: "반응형이고 상호작용이 뛰어난 웹 인터페이스를 개발합니다.",
//     location: "마이애미, FL",
//     skills: ["React", "TypeScript", "CSS"],
//   },
// ];

// // getUserListAPI

// export const UserList = () => {
//   return <UserCard members={members} />;
// };

// ... 기존 import ...
import { useEffect, useState } from "react";
import type { UserData } from "@/apis/user";
import { getUserListAPI } from "@/apis/user";
import { UserCard } from "@/components/UserCard";

export const UserList = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserListAPI({
      userType: "",
      search: "",
      page: "1",
      pageSize: "20",
    })
      .then((res) => {
        if (res.success) setUsers(res.data);
        else setError("데이터를 불러오지 못했습니다.");
      })
      .catch(() => setError("에러가 발생했습니다."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return <UserCard users={users} />;
};
