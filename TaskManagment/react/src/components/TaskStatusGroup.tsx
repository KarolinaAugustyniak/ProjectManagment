import React, { useEffect, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCardDragabble from "./TaskCardDragabble";
import Plus from "../assets/img/plus.svg";
import axios from "axios";
import useOutsideClick from "../hooks/useOutsideClick";
import { useParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskListElement from "./TaskListElement";
import Task from "../interfaces/Task";

interface TaskStatusGroupProps {
  title: string;
  index: string;
  id: string;
  tasksForColumn: Task[];
  currentView: string;
}

const TaskStatusGroup: React.FC<TaskStatusGroupProps> = ({
  title,
  index,
  id,
  tasksForColumn,
  currentView,
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
  const { setTasks } = useTaskContext();

  const handleClick = () => {
    setAddNewTask(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, Title: event.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitTask();
    }
  };

  useOutsideClick(newTaskItem, async () => {
    submitTask();
  });

  const submitTask = async () => {
    if (newTask.Title === "") {
      setAddNewTask(false);
    } else {
      setAddNewTask(false);
      setNewTask({ ...newTask, Title: "" });
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
  };

  //add focus on input when adding new task
  useEffect(() => {
    if (addNewTask && newTaskInputRef.current) {
      newTaskInputRef.current.focus();
    }
  }, [addNewTask]);

  return (
    <>
      {currentView === "kanban" ? (
        <div className="kanban__column">
          <h2 className="kanban__title">{title}</h2>
          <Droppable droppableId={id}>
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="kanban__list"
              >
                {(tasksForColumn as Task[]).map((task, index) => (
                  <TaskCardDragabble
                    key={task.taskId}
                    task={task}
                    index={index}
                  />
                ))}
                {addNewTask && (
                  <li className="task-card" ref={newTaskItem}>
                    <input
                      type="text"
                      placeholder="Add task title"
                      className="task-card__input"
                      ref={newTaskInputRef}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </li>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <button className="kanban__add-task" onClick={handleClick}>
            Add new task <img src={Plus} />
          </button>
        </div>
      ) : (
        <div className="list__row">
          <h2 className="list__title">{title}</h2>
          <Droppable droppableId={id}>
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list__ul"
              >
                {(tasksForColumn as Task[]).map((task, index) => (
                  <TaskListElement
                    key={task.taskId}
                    task={task}
                    index={index}
                  />
                ))}
                {addNewTask && (
                  <li className="list__element" ref={newTaskItem}>
                    <input
                      type="text"
                      placeholder="Add task title"
                      className="task-card__input"
                      ref={newTaskInputRef}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </li>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <button className="list__add-task" onClick={handleClick}>
            Add new task <img src={Plus} />
          </button>
        </div>
      )}
    </>
  );
};

export default TaskStatusGroup;
