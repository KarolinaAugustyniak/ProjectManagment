// Project.tsx
import React, { useEffect, useState } from "react";
import Kanban from "../components/Kanban";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layouts/Layout";
import { useTaskContext } from "../context/TaskContext";
import NavigationAndSearch from "../components/NavigationAndSearch";
import TaskList from "../components/TaskList";

export default function Project() {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();
  const [currentView, setCurrentView] = useState("kanban");
  const [filteredTasks, setFilteredTasks] = useState({});

  useEffect(() => {
    const status = Object.keys(tasks);
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7261/api/TaskItems/getForProject/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedTasks = {
          "To do": [],
          "In Progress": [],
          Testing: [],
          Completed: [],
        };

        // assigning tasks to the columns based on status
        response.data.forEach((task) => {
          updatedTasks[status[task.status]].push(task);
        });

        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [projectId]);

  return (
    <Layout>
      <h1 className="main-title">Title</h1>
      <NavigationAndSearch
        currentView={currentView}
        switchToKanbanView={() => setCurrentView("kanban")}
        switchToListView={() => setCurrentView("list")}
        setFilteredTasks={setFilteredTasks}
      />
      {currentView === "kanban" && <Kanban filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />}
      {currentView === "list" && <TaskList />}
    </Layout>
  );
}
