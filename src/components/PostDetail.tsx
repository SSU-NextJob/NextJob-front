import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/atoms/Button";
import { Loading } from "@/components/atoms/Loading";
import type { PostDetailResponse } from "@/apis/post";
import normalizedDate from "@/utils/normalizedDate";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";

interface PostDetailProps {
  postDetail?: PostDetailResponse;
  isLoading: boolean;
  error: string | null;
}

export const PostDetail = ({
  postDetail,
  isLoading,
  error,
}: PostDetailProps) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();
  const { userId } = useUserStore();
  const [activeTab, setActiveTab] = useState("project-info");

  const handleOpenApplyModal = (post: PostDetailResponse) => {
    onOpenModal("apply", {
      projectId: post.project.projectId,
      postId: post.postId,
      onApply: () => {
        /* ... */
      },
    });
  };

  if (isLoading) return <Loading />;

  if (error) return <div className="text-red-500">{error}</div>;

  if (!postDetail) return null;

  // 프로젝트 소유자인지 판별
  // const isProjectOwner = userId && userId === postDetail.userId;

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
                postDetail.project.image ??
                "https://placehold.co/800x400?text=Project+Image"
              }
              className="max-h-96 w-auto h-auto object-contain"
              style={{ maxWidth: "100%", maxHeight: "24rem" }}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {postDetail.title}
          </h1>
          <p className="text-gray-400 mb-2">{postDetail.project.name}</p>
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
              {/* 지원자 탭은 실제 API 연동 시 활성화
              {isProjectOwner && (
                <button
                  onClick={() => setActiveTab("applicants")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "applicants"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  지원자 (0)
                </button>
              )}
              */}
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
                  {postDetail.roleType}
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  프로젝트 타입
                </h3>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                  {postDetail.project.type}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">상세 설명</h3>
              <p className="text-gray-500 leading-relaxed">
                {postDetail.content}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-800">주요 업무</h3>
              <p className="text-gray-500 leading-relaxed">
                {postDetail.project.content}
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
                  {normalizedDate(postDetail.project.startAt)}
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
                  {normalizedDate(postDetail.project.endAt)}
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
                        postDetail.project.image ||
                        "https://placehold.co/64x64?text=Project"
                      }
                      alt="프로젝트 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-lg font-bold truncate">
                        {postDetail.project.name}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                        {postDetail.project.type}
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-400 mb-1 flex-wrap">
                      <span>
                        시작일: {normalizedDate(postDetail.project.startAt)}
                      </span>
                      <span>
                        마감일: {normalizedDate(postDetail.project.endAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  {postDetail.project.content}
                </div>
              </div>
            </div>

            {/* 참가 버튼 */}
            <div className="flex justify-end mt-8">
              {userId && userId !== postDetail.userId && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenApplyModal(postDetail);
                  }}
                  color={"blue"}
                >
                  참가하기
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 지원자 탭은 실제 API 연동 시 활성화
        {activeTab === "applicants" && isProjectOwner && (
          <div className="rounded-2xl border bg-white shadow-sm p-8 text-left">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              지원자 목록
            </h2>
            <div className="text-gray-500 text-center py-8">
              아직 지원자가 없습니다.
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
};
