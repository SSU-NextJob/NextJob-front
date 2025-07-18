import { useUserStore } from "@/store/userStore";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { userId } = useUserStore();
  if (!userId) {
    return <Navigate to="/post" replace />;
  }
  return <>{children}</>;
}
