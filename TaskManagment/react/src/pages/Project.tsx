// Project.tsx
import React, { useEffect, useState } from "react";
import Kanban from "../components/Kanban";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layouts/Layout";
import { useTaskContext } from "../context/TaskContext";

export default function Project() {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reset tasks to an empty object before fetching new data
        const response = await axios.get(
          `https://localhost:7261/api/TaskItems/getForProject/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedTasks = {
          "To do": [],
          "In Progress": [],
          Testing: [],
          Completed: [],
        };

        // Assign tasks to the columns based on status
        response.data.forEach((task) => {
          updatedTasks[status[task.status]].push(task);
        });

        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [projectId]);

  const status = Object.keys(tasks);

  return (
    <Layout>
      <h1 className="main-title">Title</h1>

      <Kanban status={status} />
    </Layout>
  );
}
