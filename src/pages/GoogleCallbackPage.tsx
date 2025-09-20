import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleCallback = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);

        // JSON 데이터가 있는 경우 (기존 방식)
        const jsonData = urlParams.get("data");
        if (jsonData) {
          const response = JSON.parse(decodeURIComponent(jsonData));
          if (response.success && response.data) {
            const { name, userId } = response.data;
            localStorage.setItem("googleAuthData", JSON.stringify(response));
            setUser({ userId, userName: name });
            // window.alert("로그인 성공 1");
            navigate("/", { replace: true });
            return;
          }
        }

        // 개별 파라미터로 전달된 경우 (새로운 방식)
        const userId = urlParams.get("userId");
        const name = urlParams.get("name");
        const email = urlParams.get("email");

        if (userId && name) {
          const decodedName = decodeURIComponent(name);

          const userData = {
            userId: parseInt(userId, 10),
            name: decodedName,
            email: email ? decodeURIComponent(email) : undefined,
            description: urlParams.get("description") || undefined,
            techStack: urlParams.get("techStack") || undefined,
            profileImage: urlParams.get("profileImage") || undefined,
            isVisible: urlParams.get("isVisible")
              ? urlParams.get("isVisible") === "true"
              : undefined,
            userType: urlParams.get("userType") || undefined,
          };

          const response = { success: true, data: userData };
          localStorage.setItem("googleAuthData", JSON.stringify(response));
          setUser({ userId: userData.userId, userName: userData.name });
          // window.alert("로그인 성공");
          navigate("/", { replace: true });
        } else {
          console.error("No authentication data received");
          // window.alert("로그인 실패 - 필수 정보 누락");
          navigate("/", { replace: true });
        }
      } catch (error) {
        // window.alert("로그인 실패 - 처리 오류");
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
