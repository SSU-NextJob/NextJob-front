/**
 * 의존성 순서로 import 정렬의 장점:
 * - 번들러가 의존성 관계를 더 잘 파악할 수 있음
 * - 트리 쉐이킹 최적화에 도움
 * - 빌드 크기 감소 및 빌드 속도 향상
 * - 코드 가독성 및 유지보수성 향상
 */

// 표준 라이브러리 (가장 작은 의존성)
import { useEffect, useState } from "react";

// 서드파티 라이브러리 (외부 의존성)
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 내부 모듈 (프로젝트 내부 - 가장 큰 의존성)
import "./App.css";
import "./index.css";
import { AppRoutes } from "./routes";
import { Header } from "@/widgets/HeaderMenu/ui/HeaderMenu";
import { ModalRoot } from "@/widgets/Modal/ui/ModalRoot";

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.MODE === "development") {
    try {
      const { worker } = await import("./features/user/mocks/browser");
      await worker.start();
      console.log("MSW Mocking enabled");
    } catch (error) {
      console.error("MSW 시작 실패:", error);
    }
  }
}

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await enableMocking();
      setIsReady(true);
    };
    initApp();
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Header />
        <ModalRoot />
        <div className="w-full min-h-screen flex flex-col items-stretch">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
