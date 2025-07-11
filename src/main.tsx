﻿import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider resetCSS={false} cssVarsRoot="body" value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
