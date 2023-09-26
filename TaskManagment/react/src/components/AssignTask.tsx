import React, { useEffect, useState } from "react";
import User from "./User";
import UserData from "../interfaces/User";
import axios from "axios";
import Task from "../interfaces/Task";
import { useTaskContext } from "../context/TaskContext";
import CloseIcon from "../assets/img/close.svg";

interface AssignTaskProps {
  assignedToUser?: UserData;
  task: Task;
}

const AssignTask: React.FC<AssignTaskProps> = (props) => {
  const { assignedToUser, task } = props;
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<any[]>([]);
  const { tasks, setTasks } = useTaskContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:7261/api/Organizations/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleAssignUser = async (assignedUserId) => {
    const assignedUser = users.find((user) => user.userId === assignedUserId);

    try {
      await axios.put(
        `https://localhost:7261/api/TaskItems/${task.taskId}`,
        {
          title: task.title,
          status: task.status,
          assignedTo: assignedUserId,
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
        t.taskId === task.taskId ? { ...t, assignedTo: assignedUserId, assignedToUser: assignedUser } : t
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-details__wrapper">
      <p className="task-details__name">Assigned to</p>
      {assignedToUser ? (
        <div className="task-details__user">
          <User user={assignedToUser} />
          <button onClick={() => handleAssignUser(null)} className="task-details__close">
            <img src={CloseIcon} alt="close" />
          </button>
        </div>
      ) : (
        <select onChange={(e) => handleAssignUser(parseInt(e.target.value))} className="task-details__element">
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
export default AssignTask;
