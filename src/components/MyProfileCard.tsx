// react imports
import { useState } from "react";

// shared imports
import { Button } from "@/components/atoms/Button";
import type { ProjectResponse } from "@/apis/project";
import normalizedDate from "@/utils/normalizedDate";
import { PatchUserDetailAPI } from "@/apis/user";
import { useUserStore } from "@/store/userStore";
import { MultiSelector } from "@/components/modules/Dropdown";
import { getGroupCode, type CodeResponse } from "@/apis/group";
import { useEffect } from "react";

const MyProfileCard = ({
  userProfile,
  joinedProjects,
  onSave = () => {},
}: MyProfileProps) => {
  if (!userProfile) return;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: userProfile.userName,
    role: userProfile.userType,
    techStack: userProfile.techStack,
    description: userProfile.description,
  });

  const { userId } = useUserStore();
  const [userTypeOptions, setUserTypeOptions] = useState<CodeResponse[]>([]);

  useEffect(() => {
    if (isEditing) {
      getGroupCode("USER_TYPE").then((res) => {
        if (res.success) {
          setUserTypeOptions(res.data);
          const selectedCode = res.data.find(opt => opt.detailName === userProfile.userType)?.detailCode;
          setForm(prev => ({ ...prev, role: selectedCode || "" }));
        }
      });
    }
  }, [isEditing]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      await PatchUserDetailAPI(
        userId,
        form.name,
        form.techStack,
        form.description,
        form.role
      );
      window.location.reload();
    } catch (e) {
      alert("수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setForm({
      name: userProfile.userName,
      role: userProfile.userType,
      techStack: userProfile.techStack,
      description: userProfile.description,
    });
    setIsEditing(false);
  };

  const profileKeys = ["name", "role", "techStack"] as const; // aboutMe?
  type ProfileKey = (typeof profileKeys)[number];

  return (
    <div className="flex flex-col bg-white rounded-xl p-6 w-full">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">내 프로필</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleCancel} color={"gray"}>
              취소
            </Button>
            <Button onClick={handleSave} color={"blue"}>
              저장
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} color={"gray"}>
            수정
          </Button>
        )}
      </div>

      {/* 기본 정보 */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
            {userProfile.profileImage ? (
              <img
                src={userProfile.profileImage}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-24 w-24 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            )}
          </div>
          <label className="text-xs text-blue-600 cursor-pointer hover:underline">
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("선택한 이미지 파일:", file.name);
                }
              }}
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {profileKeys.map((key: ProfileKey) => (
            <div key={key}>
              <span className="text-sm text-gray-500">
                {{
                  name: "이름",
                  role: "역할",
                  techStack: "기술 스택",
                }[key]}
              </span>
              {isEditing ? (
                key === "role" ? (
                  <MultiSelector
                    rawOptions={userTypeOptions.map((opt) => ({ label: opt.detailName, value: opt.detailCode }))}
                    isOptionObject={true}
                    value={form.role}
                    onSelectOption={(val) => handleChange("role", val)}
                  />
                ) : (
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full border px-3 py-2 rounded-md text-sm mt-1"
                  />
                )
              ) : (
                <p className="text-gray-800 font-medium">{form[key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 소개 */}
      <div className="mb-8">
        <h2 className="text-sm text-gray-500 font-semibold mb-1">자기소개</h2>
        {isEditing ? (
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
            rows={4}
          />
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {form.description}
          </p>
        )}
      </div>

      {/* 프로젝트 목록 */}
      <div>
        <h2 className="text-sm text-gray-500 font-semibold mb-3">
          참여한 프로젝트
        </h2>
        <div className="flex flex-col gap-3">
          {joinedProjects.map((project) => (
            <div
              key={project.projectId}
              className="border rounded-lg px-4 py-3 bg-white flex justify-between items-start"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{project.content}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full">
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap mt-1">
                📅 {normalizedDate(project.startAt)} ~
                {normalizedDate(project.endAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// types
export interface UserProfile {
  profileImage: string;
  userName: string;
  userType: string;
  description: string;
  techStack: string;
}

interface MyProfileProps {
  userProfile?: UserProfile;
  joinedProjects: ProjectResponse[];
  onSave: (updated: {
    name: string;
    role: string;
    techStack: string;
    aboutMe: string;
  }) => void;
}

export default MyProfileCard;
