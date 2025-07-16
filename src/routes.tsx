import { Routes, Route } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserPage from "./pages/UserPages";
import UserDetailPages from "./pages/UserDetailPages";
import { MyPage } from "./pages/MyPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/post" element={<PostPage />} />
    <Route path="/post/detail/:id" element={<PostDetailPage />} />
    <Route path="/user" element={<UserPage />} />
    <Route path="/user/detail/:id" element={<UserDetailPages />} />
    <Route path="/mypage" element={<MyPage />} />
  </Routes>
);
