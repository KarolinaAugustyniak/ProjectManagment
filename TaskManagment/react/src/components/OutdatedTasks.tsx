import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import TaskCardDetails from "./TaskCardDetails";
import { Link } from "react-router-dom";

const OutdatedTasks = () => {
  const [outdatedTasks, setOutdatedTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7261/api/taskitems/outdated",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOutdatedTasks(response.data);
      } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
      }
    };

    fetchUpcomingTasks();
  }, []);

  return (
    <div className="tasks-box">
      <h2 className="title">Outdated Tasks</h2>
      {outdatedTasks.length == 0 ? (
        <p>You don't have outdated tasks</p>
      ) : (
        <ul className="tasks-box__list">
          {outdatedTasks.map((task, index) => (
            <li key={index}>
              <Link to={`/project/${task.projectId}`}>
                <TaskCard task={task} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OutdatedTasks;
