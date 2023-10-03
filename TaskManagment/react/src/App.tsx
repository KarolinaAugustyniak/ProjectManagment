import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";
import { ProjectsProvider } from "./context/ProjectsContext";

function App() {
  return (
    <TaskProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="project/:projectId" element={<Project />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ProjectsProvider>
    </TaskProvider>
  );
}

export default App;
