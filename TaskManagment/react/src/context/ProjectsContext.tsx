import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Project from "../interfaces/Project";

interface ProjectsContextProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}
const ProjectsContext = createContext<ProjectsContextProps | undefined>(
  undefined
);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7261/api/Projects/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
