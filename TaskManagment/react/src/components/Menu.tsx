import React, { useEffect, useState } from "react";
import Projects from "../assets/img/projects.svg";
import Tasks from "../assets/img/tasks.svg";
import Settings from "../assets/img/settings.svg";

import axios from "axios";
import { Link } from "react-router-dom";

export default function Menu() {
  const [projects, setProjects] = useState([]);
  const [isProjectsSubMenuOpen, setProjectsSubMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const toggleProjectsSubMenu = () => {
    setProjectsSubMenuOpen(!isProjectsSubMenuOpen);
  };

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
    fetchData();
  }, []);

  return (
    <ul className="menu">
      <li
        className={`menu__element menu__element--arrow ${
          isProjectsSubMenuOpen ? "menu__element--open" : ""
        }`}
        onClick={toggleProjectsSubMenu}
      >
        <img src={Projects} /> Projects
      </li>
      <ul
        className={`menu__submenu ${
          isProjectsSubMenuOpen ? "menu__submenu--visible" : ""
        }`}
      >
        {projects ? (
          projects.map((project) => (
            <li key={project.projectId}>
              <Link to={`/project/${project.projectId}`} className="menu__link">
                {project.projectName}
              </Link>{" "}
            </li>
          ))
        ) : (
          <li>No projects found</li>
        )}
      </ul>

      <li className="menu__element">
        <img src={Settings} />
        <Link to="/settings" className="menu__link">
          Settings
        </Link>
      </li>
    </ul>
  );
}
