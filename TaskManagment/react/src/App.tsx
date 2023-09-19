import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Project from "./pages/Project";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="settings" element={<Settings />} />
        <Route path="project/:projectId" element={<Project />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
