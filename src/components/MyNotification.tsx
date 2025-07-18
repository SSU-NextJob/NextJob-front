import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  getRequests,
  type RequestItem,
  postRequestReply,
} from "@/apis/request";
import { Badge } from "@/components/atoms/Badge";
import normalizedDate from "@/utils/normalizedDate";

export const MyNotification = () => {
  const { userId } = useUserStore();
  const [incomingApply, setIncomingApply] = useState<RequestItem[]>([]);
  const [incomingSuggest, setIncomingSuggest] = useState<RequestItem[]>([]);
  const [outgoingApply, setOutgoingApply] = useState<RequestItem[]>([]);
  const [outgoingSuggest, setOutgoingSuggest] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getRequests(userId)
      .then((res) => {
        if (res.success) {
          setIncomingApply(res.data.incomingRequests.apply || []);
          setIncomingSuggest(res.data.incomingRequests.suggest || []);
          setOutgoingApply(res.data.outgoingRequests.apply || []);
          setOutgoingSuggest(res.data.outgoingRequests.suggest || []);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // UserCard에 맞는 mock user 데이터 변환 (실제 연동 시 user 정보 포함 필요)
  const toUserCardData = (req: RequestItem) => ({
    userId: req.requestId, // 실제 userId로 교체 필요
    name: req.project.name, // 실제 유저명으로 교체 필요
    description: req.project.content, // 실제 유저 소개로 교체 필요
    techStack: req.project.projectType, // 실제 유저 techStack으로 교체 필요
    profileImage: req.project.image, // 실제 유저 이미지로 교체 필요
    email: "-", // UserData 타입 필수값 placeholder
    userType: "-", // UserData 타입 필수값 placeholder
    isVisible: true, // UserData 타입 필수값 placeholder
  });

  // 모집 공고 카드 렌더 함수
  const renderProjectCard = (req: RequestItem) => (
    <div
      key={req.requestId}
      className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition text-left"
    >
      <div className="text-xs font-medium text-gray-500 flex justify-between mb-1 text-left">
        <Badge type={req.project.projectType} />
        <span>{normalizedDate(req.requestDate)}</span>
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mb-1 text-left">
        {req.project.name}
      </h3>
      <div className="text-xs text-gray-500 mb-1 text-left">프로젝트 설명</div>
      <div className="text-xs font-medium mb-2 text-left">
        {req.project.content}
      </div>
      <div className="text-xs text-gray-500 mb-1 text-left">요청 상태</div>
      <div className="flex flex-wrap gap-2 mb-2 text-left">
        <span className="bg-gray-200 px-2 py-0.5 text-xs rounded-full">
          {req.requestStatus}
        </span>
      </div>
      <div className="text-xs text-gray-500">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {normalizedDate(req.project.startAt)} ~{" "}
          {normalizedDate(req.project.endAt)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl text-left">
      {loading ? (
        <div className="text-center text-gray-500">불러오는 중...</div>
      ) : (
        <div className="space-y-10">
          {/* 내 프로젝트 참여 요청한 사람 - UserCard 스타일 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              내 프로젝트 참여 요청한 사람
            </h2>
            {incomingApply.length === 0 ? (
              <div className="text-gray-400 text-sm">요청이 없습니다.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {incomingApply.map((req) => (
                  <div
                    key={req.requestId}
                    className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {req.project.name}
                      </h2>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {req.project.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full">
                          {req.project.projectType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        요청일: {new Date(req.requestDate).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        상태: {req.requestStatus}
                      </div>
                    </div>
                    {/* 수락/거절 버튼은 상태가 PENDING일 때만 노출 */}
                    {req.requestStatus === "PENDING" && (
                      <div className="flex gap-2 justify-end">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
                          onClick={async () => {
                            await postRequestReply(req.requestId, "ACCEPTED");
                            req.requestStatus = "ACCEPTED";
                            setIncomingApply((prev) => [...prev]);
                          }}
                        >
                          수락
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded-md text-sm font-semibold"
                          onClick={async () => {
                            await postRequestReply(req.requestId, "REJECTED");
                            req.requestStatus = "REJECTED";
                            setIncomingApply((prev) => [...prev]);
                          }}
                        >
                          거절
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 내게 온 프로젝트 제안 - 내 프로젝트 참여 요청한 사람과 동일한 카드/버튼 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              내게 온 프로젝트 제안
            </h2>
            {incomingSuggest.length === 0 ? (
              <div className="text-gray-400 text-sm">요청이 없습니다.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {incomingSuggest.map((req) => (
                  <div
                    key={req.requestId}
                    className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {req.project.name}
                      </h2>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {req.project.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full">
                          {req.project.projectType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        요청일: {new Date(req.requestDate).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        상태: {req.requestStatus}
                      </div>
                    </div>
                    {/* 수락/거절 버튼은 상태가 PENDING일 때만 노출 */}
                    {req.requestStatus === "PENDING" && (
                      <div className="flex gap-2 justify-end">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
                          onClick={async () => {
                            await postRequestReply(req.requestId, "ACCEPTED");
                            req.requestStatus = "ACCEPTED";
                            setIncomingSuggest((prev) => [...prev]);
                          }}
                        >
                          수락
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded-md text-sm font-semibold"
                          onClick={async () => {
                            await postRequestReply(req.requestId, "REJECTED");
                            req.requestStatus = "REJECTED";
                            setIncomingSuggest((prev) => [...prev]);
                          }}
                        >
                          거절
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 내가 참여 요청한 프로젝트 - 모집 공고 카드 스타일 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              내가 참여 요청한 프로젝트
            </h2>
            {outgoingApply.length === 0 ? (
              <div className="text-gray-400 text-sm">요청이 없습니다.</div>
            ) : (
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {outgoingApply.map(renderProjectCard)}
              </div>
            )}
          </section>

          {/* 내가 제안한 사람 - 버튼 없이 정보만 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">내가 제안한 사람</h2>
            {outgoingSuggest.length === 0 ? (
              <div className="text-gray-400 text-sm">요청이 없습니다.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {outgoingSuggest.map((req) => (
                  <div
                    key={req.requestId}
                    className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {req.project.name}
                      </h2>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {req.project.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full">
                          {req.project.projectType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        요청일: {new Date(req.requestDate).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        상태: {req.requestStatus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
