import { Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPages";
import ProjectDetailPages from "./pages/ProjectDetailPages";
import UserPage from "./pages/UserPages";
import UserDetailPages from "./pages/UserDetailPages";

export const AppRoutes = () => (
  <Routes>
    <Route path="/project" element={<ProjectPage />} />
    <Route path="/project/detail/:id" element={<ProjectDetailPages />} />
    <Route path="/user" element={<UserPage />} />
    <Route path="/user/detail/:id" element={<UserDetailPages />} />
  </Routes>
);
