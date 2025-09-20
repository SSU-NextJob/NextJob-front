import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleCallback = () => {
      try {
        // URL에서 백엔드가 제공한 JSON 데이터를 파싱
        const urlParams = new URLSearchParams(window.location.search);
        const userData = urlParams.get("data");

        if (userData) {
          const response = JSON.parse(decodeURIComponent(userData));

          if (response.success && response.data) {
            const {
              name,
              userId,
              // , email, description, techStack, profileImage, isVisible, userType
            } = response.data;

            // 전체 응답을 localStorage에 저장
            localStorage.setItem("googleAuthData", JSON.stringify(response));

            // userStore에 사용자 정보 저장
            setUser({ userId, userName: name });

            // 기본 주소로 이동
            navigate("/", { replace: true });
          } else {
            console.error("Authentication failed:", response.error);
            navigate("/", { replace: true });
          }
        } else {
          console.error("No authentication data received");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Error processing authentication callback:", error);
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
