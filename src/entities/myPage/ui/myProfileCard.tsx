// react imports
import { useState } from "react";

// shared imports
import { Button } from "@/shared/ui/atoms/Button";

const MyProfileCard = ({
  name,
  role,
  oneLineIntro,
  aboutMe,
  joinedProjects,
  onSave = () => {},
}: MyProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name,
    role,
    oneLineIntro,
    aboutMe,
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("form", form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ name, role, oneLineIntro, aboutMe });
    setIsEditing(false);
  };

  const profileKeys = ["name", "role", "oneLineIntro"] as const; // aboutMe?
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
          <div className="w-32 h-32 bg-gray-100 rounded-full" />
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
                {
                  {
                    name: "이름",
                    role: "역할",
                    oneLineIntro: "한 줄 소개",
                  }[key]
                }
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full border px-3 py-2 rounded-md text-sm mt-1"
                />
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
            value={form.aboutMe}
            onChange={(e) => handleChange("aboutMe", e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
            rows={4}
          />
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {form.aboutMe}
          </p>
        )}
      </div>

      {/* 프로젝트 목록 */}
      <div>
        <h2 className="text-sm text-gray-500 font-semibold mb-3">
          참여한 프로젝트
        </h2>
        <div className="flex flex-col gap-3">
          {joinedProjects.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg px-4 py-3 bg-white flex justify-between items-start"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full">
                    {p.role}
                  </span>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap mt-1">
                📅 {p.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// types
interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  date: string;
  tags: string[];
}

interface MyProfileProps {
  name: string;
  role: string;
  oneLineIntro: string;
  aboutMe: string;
  joinedProjects: Project[];
  onSave: (updated: {
    name: string;
    role: string;
    oneLineIntro: string;
    aboutMe: string;
  }) => void;
}

export default MyProfileCard;
