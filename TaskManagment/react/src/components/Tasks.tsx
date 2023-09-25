import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useTaskContext } from "../context/TaskContext";
import axios from "axios";
import Task from "../interfaces/Task";
import TaskStatusGroup from "./TaskStatusGroup";

interface TasksProps {
  filteredTasks: Record<string, Task[]>;
  currentView: string;
}

const Tasks: React.FC<TasksProps> = ({ filteredTasks, currentView }) => {
  const { tasks, setTasks } = useTaskContext();
  const status = Object.keys(filteredTasks);
  const token = localStorage.getItem("token");

  //changing task status
  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const updatedTasks = { ...tasks };
    const sourceColumn = updatedTasks[source.droppableId];
    const destinationColumn = updatedTasks[destination.droppableId];

    const taskToMove = sourceColumn.splice(source.index, 1)[0];
    destinationColumn.splice(destination.index, 0, taskToMove);

    setTasks(updatedTasks);

    const taskColumns = Object.keys(tasks);
    const columnIndex = taskColumns.indexOf(destination.droppableId);

    const updatedTask = { ...taskToMove, status: columnIndex };

    try {
      await axios.put(`https://localhost:7261/api/TaskItems/${updatedTask.taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`${currentView}`}>
        {status.map((statusItem, index) => {
          const tasksForColumn = filteredTasks[statusItem] || [];
          return (
            <TaskStatusGroup
              title={statusItem}
              key={index}
              index={index.toString()}
              id={statusItem}
              tasksForColumn={tasksForColumn}
              currentView={currentView}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
