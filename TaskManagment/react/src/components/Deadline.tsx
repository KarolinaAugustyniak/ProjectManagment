import { useState } from "react";
import axios from "axios";
import Task from "../interfaces/Task";
import { useTaskContext } from "../context/TaskContext";
import CloseButton from "./CloseButton";
import TasksData from "../interfaces/TasksData";

interface DeadlineProps {
  task: Task;
}

const Deadline: React.FC<DeadlineProps> = ({ task }) => {
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();

  // Format the date as "YYYY-MM-DD"
  const originalDate = new Date(task.dueDate || "");
  const formattedDate = task.dueDate
    ? `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${originalDate
        .getDate()
        .toString()
        .padStart(2, "0")}`
    : "";

  const [dueDate, setDueDate] = useState(formattedDate);

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleUpdateDueDate = async () => {
    try {
      await axios.put(
        `https://localhost:7261/api/TaskItems/${task.taskId}`,
        {
          ...task,
          dueDate: dueDate || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the tasks list in the context
      const updatedTasks: TasksData = { ...tasks };
      const statusMap = ["To do", "In Progress", "Testing", "Completed"];
      const statusString = statusMap[task.status];

      updatedTasks[statusString as keyof TasksData] = updatedTasks[
        statusString as keyof TasksData
      ].map((t) =>
        t.taskId === task.taskId ? { ...t, dueDate: dueDate || null } : t
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
          value={dueDate}
          onChange={handleDueDateChange}
          onBlur={handleUpdateDueDate}
        />
        {dueDate !== "" && <CloseButton onClick={() => setDueDate("")} />}
      </div>
    </div>
  );
};

export default Deadline;
