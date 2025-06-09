import "./App.css";
import "./index.css";
import ProjectPage from "./pages/Project";
import ProjectDetailPage from "./pages/ProjectDetail";

function App() {
  return (
    <>
      {/* <div className="w-full min-h-screen flex flex-col items-stretch">
        <ProjectPage />
      </div> */}
      <div className="w-full min-h-screen flex flex-col items-stretch">
        <ProjectDetailPage />
      </div>
    </>
  );
}

export default App;
