import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import TaskCardDetails from "./TaskCardDetails";

const UpcomingTasks = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingTasks();
  }, []);

  return (
    <div className="tasks-box">
      <h2>Upcoming Tasks</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="tasks-box__list">
          {upcomingTasks.map((task, index) => (
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

export default UpcomingTasks;
