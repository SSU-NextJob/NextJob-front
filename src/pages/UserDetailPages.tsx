﻿import { useParams } from "react-router-dom";
import { UserDetail } from "@/components/UserDetail";

export default function UserDetailPage() {
  const { id } = useParams(); // URL에서 id 추출
  console.log("id", id);

  if (!id) return <div>존재하지 않는 유저입니다.</div>;

  return <UserDetail />;
}
