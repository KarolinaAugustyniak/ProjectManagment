import React, { useEffect, useState } from 'react'
import Kanban from '../components/Kanban'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Project() {
    const { projectId } = useParams();
    const [tasks, setTasks]= useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://localhost:7261/api/TaskItems/getForProject/${projectId}`);
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching project data:', error);
        }
      };
      fetchData();

    }, [projectId]);
  
    useEffect(() => {
      console.log(tasks);
    }, [tasks]);

  return (
    <div><Kanban tasks={tasks} /></div>
  )
}
