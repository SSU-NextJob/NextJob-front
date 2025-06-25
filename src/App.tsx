import "./App.css";
import "./index.css";
import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import ProjectPage from "./pages/ProjectPages";
import ProjectDetailPage from "./pages/ProjectDetailPages";
import { Header } from "./widgets/HeaderMenu/ui/HeaderMenu";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-full min-h-screen flex flex-col items-stretch">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
