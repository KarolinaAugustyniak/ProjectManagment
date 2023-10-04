import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import TaskCardDetails from "./TaskCardDetails";
import { Link } from "react-router-dom";

const UpcomingTasks = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7261/api/taskitems/upcoming",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUpcomingTasks(response.data);
      } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
      }
    };

    fetchUpcomingTasks();
  }, []);

  return (
    <div className="tasks-box">
      <h2 className="title">Upcoming Tasks</h2>
      {upcomingTasks.length == 0 ? (
        <p className="text">You don't have upcoming tasks</p>
      ) : (
        <ul className="tasks-box__list">
          {upcomingTasks.map((task, index) => (
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

export default UpcomingTasks;
