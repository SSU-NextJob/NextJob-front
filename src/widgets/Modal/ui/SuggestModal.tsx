import { Button } from "@/shared/ui/atoms/Button";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  spots: number;
  roles: string[];
}

interface SuggestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postId: number) => void;
  posts?: Post[]; // 향후 외부에서 넘길 수도 있음
}

export const SuggestModal = ({
  isOpen,
  onClose,
  onSubmit,
  posts,
}: SuggestModalProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const defaultPosts: Post[] = [
    {
      id: 1,
      title: "AI 레시피 생성기",
      description: "AI 기반 요리 지원 시스템을 개발할 개발자를 모집합니다.",
      date: "2024. 3. 15.",
      spots: 4,
      roles: ["프론트엔드 개발자", "백엔드 개발자"],
    },
    {
      id: 2,
      title: "업무 관리 앱",
      description: "협업 기반 태스크 관리 앱을 함께 만들 개발자를 찾습니다.",
      date: "2024. 4. 1.",
      spots: 3,
      roles: ["풀스택 개발자", "UI/UX 디자이너"],
    },
    {
      id: 3,
      title: "날씨 대시보드",
      description:
        "깔끔한 시각화가 돋보이는 실시간 날씨 시스템 개발 프로젝트입니다.",
      date: "2024. 2. 28.",
      spots: 2,
      roles: ["프론트엔드 개발자"],
    },
  ];

  const data = posts ?? defaultPosts;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-1">프로젝트 제안</h2>
        <p className="text-sm text-gray-600 mb-4">
          제안할 모집 공고를 선택해주세요.
        </p>

        <div className="space-y-3 mb-6">
          {data.map((post) => (
            <div
              key={post.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedId === post.id ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedId(post.id)}
            >
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-700">{post.description}</p>
              <div className="flex items-center text-xs text-gray-500 mt-2 gap-4">
                <span>📅 {post.date}</span>
                <span>👥 {post.spots}명</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.roles.map((role) => (
                  <span
                    key={role}
                    className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button onClick={onClose} color={"gray"}>
            취소
          </Button>
          <Button
            disabled={selectedId === null}
            onClick={() => selectedId && onSubmit(selectedId)}
            color={"blue"}
          >
            제안하기
          </Button>
        </div>
      </div>
    </div>
  );
};
