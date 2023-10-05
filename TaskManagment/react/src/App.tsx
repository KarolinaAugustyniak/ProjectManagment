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
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="" element={<Dashboard />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="settings" element={<Settings />} />
              <Route path="project/:projectId" element={<Project />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ProjectsProvider>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
