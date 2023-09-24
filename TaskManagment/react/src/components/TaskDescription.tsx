import React, { useRef, useState } from "react";
import axios from "axios";
import { useTaskContext } from "../context/TaskContext";
import Task from "../interfaces/Task";

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription: React.FC<TaskDescriptionProps> = (props) => {
  const { task } = props;
  const [description, setDescription] = useState(task.description);
  const descriptionRef = useRef(null);
  const token = localStorage.getItem("token");
  const { tasks, setTasks } = useTaskContext();

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://localhost:7261/api/TaskItems/${task.taskId}`,
        {
          title: task.title,
          status: task.status,
          description: description,
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
        t.taskId === task.taskId ? { ...t, description: description } : t
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-details__wrapper">
      <p className="task-details__name">Description</p>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description || ""}
        ref={descriptionRef}
        onBlur={handleSubmit}
      />
    </div>
  );
};

export default TaskDescription;
