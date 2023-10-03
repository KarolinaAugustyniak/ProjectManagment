import axios from "axios";
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TasksData from "../interfaces/TasksData";

interface DeleteTaskProps {
  taskId: number;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId }) => {
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();

  const handleClick = async () => {
    try {
      await axios.delete(`https://localhost:7261/api/taskitems/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //update tasks list
      const updatedTasks: TasksData = { ...tasks };

      for (const column in updatedTasks) {
        updatedTasks[column as keyof TasksData] = updatedTasks[
          column as keyof TasksData
        ].filter((task) => task.taskId !== taskId);
      }

      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <>
      <button onClick={handleClick} className="delete-task">
        Delete task
      </button>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default DeleteTask;
