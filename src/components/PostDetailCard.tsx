import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/atoms/Button";
import type { PostDetailResponse } from "@/apis/post";
import normalizedDate from "@/utils/normalizedDate";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";

// 임시 지원자 데이터 (실제 연동 시 교체)
const applicantsData = [
  {
    id: 1,
    name: "홍길동",
    role: "프론트엔드 개발자",
    intro: "React, TypeScript 기반의 웹 프론트엔드 개발 경험 보유.",
    location: "서울 강남구",
    avatar: "https://placehold.co/40x40?text=U1",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    experience: "3년 이상",
    availability: "풀타임",
  },
  {
    id: 2,
    name: "김철수",
    role: "UI/UX 디자이너",
    intro: "사용자 경험 중심의 디자인 설계 및 프로토타이핑 경험.",
    location: "경기 성남시",
    avatar: "https://placehold.co/40x40?text=U2",
    skills: ["Figma", "Sketch", "Adobe XD"],
    experience: "4년 이상",
    availability: "파트타임",
  },
];

export const PostDetailCard = ({ post }: { post?: PostDetailResponse }) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();
  const { userId } = useUserStore();
  const [activeTab, setActiveTab] = useState("project-info");

  const handleOpenApplyModal = (post: PostDetailResponse) => {
    onOpenModal("apply", {
      projectId: post.postId,
      onApply: () => {
        /* ... */
      },
    });
  };

  if (!post) return null;

  // 프로젝트 소유자인지 판별
  const isProjectOwner = userId && userId === post.userId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-left">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-500 hover:text-gray-900 text-sm mb-4"
          >
            <span className="mr-2">←</span> 뒤로가기
          </button>
          <div
            className="w-full mb-8 flex justify-center items-center bg-gray-100 rounded-2xl overflow-hidden"
            style={{ minHeight: "200px", maxHeight: "384px" }}
          >
            <img
              src={
                post.project.image ||
                "https://placehold.co/800x400?text=Project+Image"
              }
              alt="프로젝트 이미지"
              className="max-h-96 w-auto h-auto object-contain"
              style={{ maxWidth: "100%", maxHeight: "24rem" }}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {post.title}
          </h1>
          <p className="text-gray-400 mb-2">{post.project.name}</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("project-info")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "project-info"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-400 hover:text-gray-900"
                }`}
              >
                프로젝트 정보
              </button>
              {/* {isProjectOwner && (
                <button
                  onClick={() => setActiveTab("applicants")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "applicants"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  지원자 ({applicantsData.length})
                </button>
              )} */}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "project-info" && (
          <div className="rounded-2xl border bg-white shadow-sm p-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  모집 포지션
                </h3>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium border bg-blue-50 text-blue-700 border-blue-200">
                  {post.roleType}
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  프로젝트 타입
                </h3>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                  {post.project.type}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">한 줄 요약</h3>
              <p className="text-gray-400">{post.title}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">상세 설명</h3>
              <p className="text-gray-500 leading-relaxed">{post.content}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">주요 업무</h3>
              <p className="text-gray-500 leading-relaxed">
                {post.project.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">시작일</h3>
                <div className="flex items-center text-gray-400">
                  <svg
                    className="h-4 w-4 mr-2 inline-block text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {normalizedDate(post.project.startAt)}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">마감일</h3>
                <div className="flex items-center text-gray-400">
                  <svg
                    className="h-4 w-4 mr-2 inline-block text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {normalizedDate(post.project.endAt)}
                </div>
              </div>
            </div>

            {/* 연결된 프로젝트 */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">
                연결된 프로젝트
              </h3>
              <div className="rounded-2xl border bg-white shadow-sm p-6 flex flex-col gap-4 max-w-xl text-left">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
                    <img
                      src={
                        post.project.image ||
                        "https://placehold.co/64x64?text=Project"
                      }
                      alt="프로젝트 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-lg font-bold truncate">
                        {post.project.name}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                        {post.project.type}
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-400 mb-1 flex-wrap">
                      <span>
                        시작일: {normalizedDate(post.project.startAt)}
                      </span>
                      <span>마감일: {normalizedDate(post.project.endAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  {post.project.content}
                </div>
              </div>
            </div>

            {/* 참가 버튼 */}
            <div className="flex justify-end mt-8">
              {userId && userId !== post.userId && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenApplyModal(post);
                  }}
                  color={"blue"}
                >
                  참가하기
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 지원자 탭 */}
        {activeTab === "applicants" && isProjectOwner && (
          <div className="rounded-2xl border bg-white shadow-sm p-8 text-left">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              지원자 목록
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicantsData.map((applicant) => (
                <div
                  key={applicant.id}
                  className="border rounded-xl bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={applicant.avatar}
                      alt={applicant.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-200 border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 truncate">
                        {applicant.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {applicant.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 line-clamp-2 mb-1">
                    {applicant.intro}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {applicant.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {applicant.skills.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                        +{applicant.skills.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-400 gap-2">
                    <span>{applicant.location}</span>
                    <span>·</span>
                    <span>{applicant.experience}</span>
                    <span>·</span>
                    <span>{applicant.availability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
