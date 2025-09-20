import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

// 개발 환경에서 MSW 시작 (필요시 주석 해제)
// if (import.meta.env.DEV) {
//   const { worker } = await import("./mocks/browser");
//   worker.start();
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
