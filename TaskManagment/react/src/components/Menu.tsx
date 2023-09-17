import React, { useEffect, useState } from 'react'
import Projects from "../assets/img/projects.svg"
import Tasks from "../assets/img/tasks.svg"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Menu() {
    const [projects, setProjects ] = useState([]);
    const [isProjectsSubMenuOpen, setProjectsSubMenuOpen] = useState(false);
    const [isMyTasksSubMenuOpen, setMyTasksSubMenuOpen] = useState(false);
    const token = localStorage.getItem("token");

    const toggleProjectsSubMenu = () => {
    setProjectsSubMenuOpen(!isProjectsSubMenuOpen);
    };

    const toggleMyTasksSubMenu = () => {
    setMyTasksSubMenuOpen(!isMyTasksSubMenuOpen);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('https://localhost:7261/api/Projects/get', {
                  headers: {
                    'Authorization': `Bearer ${token}` 
                  }
                });
                setProjects(response.data);
            }  catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData(); 
      }, []);


  return (
    <ul className='menu'>
        <li className={`menu__element ${ isProjectsSubMenuOpen ? "menu__element--open" : ""}`} 
          onClick={toggleProjectsSubMenu}><img src={Projects}/> Projects</li>
        <ul className={`menu__submenu ${ isProjectsSubMenuOpen ? "menu__submenu--visible" : ""}`}>
           {projects?
            projects.map(project => <li key={project.projectId}> <Link to={`/project/${project.projectId}`}>{project.projectName}</Link> </li>)
           :
            <li>No projects found</li>
            }
        </ul>
        <li className={`menu__element ${ isMyTasksSubMenuOpen ? "menu__element--open" : ""}`} 
          onClick={toggleMyTasksSubMenu}><img src={Tasks}/> My tasks</li>
        <ul className={`menu__submenu ${ isMyTasksSubMenuOpen ? "menu__submenu--visible" : ""}`}>
            <li>test</li>
            <li>test</li>
        </ul>
    </ul>
  )
}
