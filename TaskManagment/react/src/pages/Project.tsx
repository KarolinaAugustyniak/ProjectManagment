// Project.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layouts/Layout";
import { useTaskContext } from "../context/TaskContext";
import NavigationAndSearch from "../components/NavigationAndSearch";
import Tasks from "../components/Tasks";
import Task from "../interfaces/Task";
import TasksData from "../interfaces/TasksData";
import CreationData from "../components/CreationData";

export default function Project() {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();
  const [currentView, setCurrentView] = useState("kanban");
  const [filteredTasks, setFilteredTasks] = useState({});
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    fetchTasksData();
    fetchProjectData();
  }, [projectId]);

  const fetchTasksData = async () => {
    const status = Object.keys(tasks);
    try {
      const response = await axios.get(
        `https://localhost:7261/api/TaskItems/getForProject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTasks: TasksData = {
        "To do": [],
        "In Progress": [],
        Testing: [],
        Completed: [],
      };

      // assigning tasks to the columns based on status
      response.data.forEach((task: Task) => {
        updatedTasks[status[task.status]].push(task);
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7261/api/projects/getProjectData/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjectData(response.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  return (
    <Layout>
      {Object.keys(projectData).length > 0 && (
        <>
          <h1 className="main-title">{projectData.projectName}</h1>
          <CreationData
            createdByUser={projectData.user}
            date={projectData.createdAt}
          />
        </>
      )}
      <NavigationAndSearch
        currentView={currentView}
        switchToKanbanView={() => setCurrentView("kanban")}
        switchToListView={() => setCurrentView("list")}
        setFilteredTasks={setFilteredTasks}
      />
      <Tasks filteredTasks={filteredTasks} currentView={currentView} />
    </Layout>
  );
}
