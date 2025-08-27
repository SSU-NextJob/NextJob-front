import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { googleLoginAPI } from "@/apis/user";

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { setGoogleUser } = useUserStore();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const response = await googleLoginAPI();
        
        if (response.success && response.data.length > 0) {
          const userData = response.data[0];
          setGoogleUser({
            userId: userData.userId,
            name: userData.name,
            email: userData.email,
            isVisible: userData.isVisible,
          });
          
          // 로그인 성공 후 메인 페이지로 이동
          navigate("/post");
        } else {
          throw new Error("로그인 정보를 받아오지 못했습니다.");
        }
      } catch (error: Error | unknown) {
        console.error("Google 로그인 처리 중 오류:", error);
        const errorMessage = error instanceof Error ? error.message : "Google 로그인에 실패했습니다.";
        alert(errorMessage);
        navigate("/");
      }
    };

    handleGoogleCallback();
  }, [setGoogleUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Google 로그인 처리 중...</p>
      </div>
    </div>
  );
};