import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext";
import { useState } from "react";
import axios from "axios";

export default function Projects() {
  const { projects, setProjects } = useProjects();
  const [newProjectName, setNewProjectName] = useState("");
  const token = localStorage.getItem("token");

  const handleCreateProject = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7261/api/projects/create",
        `"${newProjectName}"`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProjects([...projects, response.data]);
      setNewProjectName("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="projects">
      <h2 className="title">Projects</h2>
      {projects.length > 0 ? (
        <div className="projects__wrapper">
          {projects.map((project) => (
            <Link
              key={project.projectId}
              to={`/project/${project.projectId}`}
              className="projects__project"
            >
              {project.projectName}
            </Link>
          ))}
        </div>
      ) : (
        <p>No projects found</p>
      )}

      <div className="projects__new">
        <input
          type="text"
          placeholder="New Project Name"
          value={newProjectName}
          className="input"
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={handleCreateProject} className="small-btn">
          Add
        </button>
      </div>
    </div>
  );
}
