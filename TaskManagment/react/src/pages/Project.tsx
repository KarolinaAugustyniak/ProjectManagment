// Project.tsx
import React, { useEffect, useState } from 'react';
import Kanban from '../components/Kanban';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Project() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState({
    "To do": [],
    "In Progress": [],
    "Testing": [],
    "Completed": [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7261/api/TaskItems/getForProject/${projectId}`);

        const updatedTasks = {...tasks};
       
        // Assign tasks to the columns based on status
        response.data.forEach((task) => {
          updatedTasks[status[task.status]].push(task);
        });

        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    fetchData();
  }, [projectId]);

  const status = Object.keys(tasks);

  return (
    <div>
      <Kanban tasks={tasks} setTasks={setTasks} status={status} />
    </div>
  );
}
