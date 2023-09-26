import React, { useState } from "react";
import axios from "axios";
import Task from "../interfaces/Task";
import { useTaskContext } from "../context/TaskContext";
import CloseIcon from "../assets/img/close.svg";

interface DeadlineProps {
  task: Task;
}

const Deadline: React.FC<DeadlineProps> = ({ task }) => {
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();

  // Format the date as "YYYY-MM-DD"
  const originalDate = new Date(task.dueDate);
  const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${originalDate.getDate().toString().padStart(2, "0")}`;

  const [dueDate, setDueDate] = useState(formattedDate || "");

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleUpdateDueDate = async () => {
    try {
      await axios.put(
        `https://localhost:7261/api/TaskItems/${task.taskId}`,
        {
          title: task.title,
          status: task.status,
          dueDate: dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the tasks list in the context
      const updatedTasks = { ...tasks };
      const statusMap = ["To do", "In Progress", "Testing", "Completed"];
      const statusString = statusMap[task.status];

      updatedTasks[statusString] = updatedTasks[statusString].map((t) =>
        t.taskId === task.taskId ? { ...t, dueDate: dueDate } : t
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-details__wrapper">
      <p className="task-details__name">Due to</p>
      <div className="task-details__wrap">
        <input
          type="date"
          className="task-details__element"
          value={dueDate || ""}
          onChange={handleDueDateChange}
          onBlur={handleUpdateDueDate}
        />
        {dueDate && (
          <button onClick={() => setDueDate(null)} className="task-details__close">
            <img src={CloseIcon} alt="close" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Deadline;
