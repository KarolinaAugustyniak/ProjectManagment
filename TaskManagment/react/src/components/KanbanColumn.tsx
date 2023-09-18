import React, { useEffect, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import Plus from "../assets/img/plus.svg";
import axios from "axios";
import useOutsideClick from "../hooks/useOutsideClick";
import { useParams } from "react-router-dom";

interface Task {
  id: number;
  title: string;
}

interface KanbanColumnProps {
  title: string;
  index: string;
  id: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  index,
  id,
  tasks,
  setTasks,
}) => {
  const { projectId } = useParams();
  const [newTask, setNewTask] = useState({
    Title: "",
    ProjectId: parseInt(projectId),
    Status: parseInt(index),
  });
  const [addNewTask, setAddNewTask] = useState(false);
  const newTaskItem = useRef(null);
  const newTaskInputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("token");

  const handleClick = () => {
    setAddNewTask(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, Title: event.target.value });
  };

  useOutsideClick(newTaskItem, async () => {
    if (newTask.Title === "") {
      setAddNewTask(false);
    } else {
      setAddNewTask(false);
      try {
        const response = await axios.post(
          "https://localhost:7261/api/TaskItems",
          newTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks((prevTasks) => ({
          ...prevTasks,
          [title]: [...prevTasks[title], response.data],
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });

  //add focus on input when adding new task
  useEffect(() => {
    if (addNewTask && newTaskInputRef.current) {
      newTaskInputRef.current.focus();
    }
  }, [addNewTask]);

  return (
    <div className="kanban__column">
      <h2 className="kanban__title">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="kanban__list"
          >
            {(tasks as Task[]).map((task, index) => (
              <TaskCard key={task.taskId} task={task} index={index} />
            ))}
            {addNewTask && (
              <li className="task-card" ref={newTaskItem}>
                <input
                  type="text"
                  placeholder="Add task title"
                  className="task-card__input"
                  ref={newTaskInputRef}
                  onChange={handleInputChange}
                />
              </li>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <button className="add-task" onClick={handleClick}>
        Add new task <img src={Plus} />
      </button>
    </div>
  );
};

export default KanbanColumn;
