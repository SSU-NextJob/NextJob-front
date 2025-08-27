import { Routes, Route, Navigate } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserPage from "./pages/UserPages";
import UserDetailPages from "./pages/UserDetailPages";
import WorkspacePage from "./pages/WorkspacePage";
import { MyPage } from "./pages/MyPage";
import { AuthGuard } from "./utils/AuthGuard";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/post" element={<PostPage />} />
    <Route path="/post/detail/:id" element={<PostDetailPage />} />
    <Route path="/user" element={<UserPage />} />
    <Route path="/user/detail/:id" element={<UserDetailPages />} />
    <Route path="/workspace" element={<WorkspacePage />} />
    <Route path="/auth/callback" element={<AuthCallbackPage />} />
    <Route
      path="/mypage"
      element={
        <AuthGuard>
          <MyPage />
        </AuthGuard>
      }
    />
    {/* 등록되지 않은 path는 /post로 리다이렉트 */}
    <Route path="*" element={<Navigate to="/post" replace />} />
  </Routes>
);
