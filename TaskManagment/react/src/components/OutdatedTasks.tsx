import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import TaskCardDetails from "./TaskCardDetails";

const OutdatedTasks = () => {
  const [outdatedTasks, setOutdatedTasks] = useState([]);
  const token = localStorage.getItem("token");
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  const openDetails = () => {
    setAreDetailsOpen(true);
  };

  const closeDetails = () => {
    setAreDetailsOpen(false);
  };

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
      <h2>Outdated Tasks</h2>
      {outdatedTasks.length == 0 ? (
        <p>You don't have outdated tasks</p>
      ) : (
        <ul className="tasks-box__list">
          {outdatedTasks.map((task, index) => (
            <li key={index}>
              <TaskCard task={task} onClick={openDetails} />
              {areDetailsOpen && (
                <TaskCardDetails task={task} onClose={closeDetails} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OutdatedTasks;
