import { useState } from "react";
import Projects from "../assets/img/projects.svg";
import Tasks from "../assets/img/tasks.svg";
import Settings from "../assets/img/settings.svg";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectsContext";

export default function Menu() {
  const { projects } = useProjects();
  const [isProjectsSubMenuOpen, setProjectsSubMenuOpen] = useState(false);

  const toggleProjectsSubMenu = () => {
    setProjectsSubMenuOpen(!isProjectsSubMenuOpen);
  };

  return (
    <ul className="menu">
      <li className="menu__element">
        <Link to="/dashboard" className="menu__link">
          <img src={Tasks} />
          Dashboard
        </Link>
      </li>
      <li
        className={`menu__element menu__element--arrow ${
          isProjectsSubMenuOpen ? "menu__element--open" : ""
        }`}
        onClick={toggleProjectsSubMenu}
      >
        <div className="menu__link">
          <img src={Projects} /> Projects
        </div>
        <ul
          className={`menu__submenu ${
            isProjectsSubMenuOpen ? "menu__submenu--visible" : ""
          }`}
        >
          {projects.length != 0 ? (
            projects.map((project) => (
              <li key={project.projectId}>
                <Link
                  to={`/project/${project.projectId}`}
                  className="menu__link"
                >
                  {project.projectName}
                </Link>
              </li>
            ))
          ) : (
            <li>No projects found</li>
          )}
        </ul>
      </li>

      <li className="menu__element">
        <Link to="/settings" className="menu__link">
          <img src={Settings} />
          Settings
        </Link>
      </li>
    </ul>
  );
}
