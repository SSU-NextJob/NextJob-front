import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { getCreatedProjectsAPI, type ProjectResponse } from "@/apis/project";
import { useMutation } from "@tanstack/react-query";
import { postRecruiment } from "@/apis/recruitment";
import { useUserStore } from "@/store/userStore";
import { getGroupCode, type CodeResponse } from "@/apis/group";
import { getPostList } from "@/apis/post";

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: (data: {
  //   projectId: string;
  //   summary: string;
  //   roles: string[];
  // }) => void;
  // projectOptions?: { id: string; name: string }[];
}

export const RecruitTeamModal = ({
  isOpen,
  onClose,
  // onSubmit,
  // projectOptions = [],
}: RecruitModalProps) => {
  const { userId } = useUserStore();
  const [projectId, setProjectId] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [projectList, setProjectList] = useState<ProjectResponse[]>([]);
  const [projectOptions, setProjectOptions] = useState<CodeResponse[]>([]);

  if (!userId) return;

  useEffect(() => {
    getGroupCode("USER_TYPE").then((res) => {
      if (res.success) setProjectOptions(res.data);
    });

    getCreatedProjectsAPI(userId)
      .then((res) => {
        if (res.success) setProjectList(res.data);
      })
      .catch()
      .finally();
    // () => setLoading(false)
  }, []);

  const postRecruimentMutation = useMutation({
    mutationFn: postRecruiment,
    onSuccess: () => {
      alert("모집 공고를 생성했습니다.");
      window.location.reload();
      onClose();
    },
    onError: (e: any) => {
      alert(e.message || "모집 공고 생성을 실패했습니다.");
    },
  });

  const handleSubmit = () => {
    if (!projectId || !title || !summary || !selectedRole) return;
    postRecruimentMutation.mutate({
      userId,
      userName: "testUser",
      projectId,
      title,
      content: summary,
      roleType: selectedRole, // detailCode가 저장됨
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#333]">팀원 모집</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Project select */}
          <div>
            <label className="text-sm font-semibold block mb-2 text-[#333]">
              프로젝트 선택
            </label>
            <select
              className="border w-full px-3 py-2 rounded-md text-sm bg-white text-[#333]"
              value={projectId}
              onChange={(e) => setProjectId(Number(e.target.value))}
            >
              <option value="">모집할 프로젝트를 선택하세요</option>
              {projectList.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* title */}
          <div>
            <label className="text-sm font-semibold block mb-2 text-[#333]">공고 제목</label>
            <input
              className="border w-full px-3 py-2 rounded-md text-sm bg-white text-[#333]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Summary */}
          <div>
            <label className="text-sm font-semibold block mb-2 text-[#333]">주요 업무</label>
            <textarea
              className="border w-full px-3 py-2 rounded-md text-sm bg-white text-[#333] placeholder:text-gray-500"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="팀원들을 끌어들일 멋진 요약을 작성하세요..."
            />
          </div>

          {/* Selected role preview */}
          {selectedRole && (
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-600 text-white text-sm rounded-full px-3 py-1 flex items-center">
                {
                  projectOptions.find((opt) => opt.detailCode === selectedRole)
                    ?.detailName
                }
                <button
                  type="button"
                  onClick={() => setSelectedRole("")}
                  className="ml-2 flex items-center justify-center text-white hover:text-gray-200 text-sm p-0 leading-none"
                >
                  ×
                </button>
              </span>
            </div>
          )}

          {/* Common roles */}
          <div>
            <label className="text-sm font-semibold block mb-2 text-[#333]">필요 역할</label>
            {/* <div className="text-xs text-gray-500 mb-1">주요 역할:</div> */}
            <div className="flex flex-wrap gap-2">
              {projectOptions.map((role) => (
                <button
                  key={role.detailCode}
                  type="button"
                  onClick={() => setSelectedRole(role.detailCode)}
                  className={`border rounded-full px-3 py-1 text-sm transition ${
                    selectedRole === role.detailCode
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {selectedRole === role.detailCode ? "✓ " : ""}
                  {role.detailName}
                </button>
              ))}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={onClose} color="gray">
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              color="blue"
              disabled={!projectId || !title || !summary || !selectedRole}
            >
              모집 등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
