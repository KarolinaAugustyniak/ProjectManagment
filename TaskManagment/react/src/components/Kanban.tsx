// Kanban.tsx
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import { useTaskContext } from "../context/TaskContext";
import axios from "axios";

const Kanban = ({ status }) => {
  const { tasks, setTasks } = useTaskContext();
  const token = localStorage.getItem("token");

  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = { ...tasks };
    const sourceColumn = updatedTasks[source.droppableId];
    const destinationColumn = updatedTasks[destination.droppableId];

    const taskToMove = sourceColumn.splice(source.index, 1)[0];
    destinationColumn.splice(destination.index, 0, taskToMove);

    setTasks(updatedTasks);

    const updatedTask = { ...taskToMove, status: destination.index };

    try {
      await axios.put(
        `https://localhost:7261/api/TaskItems/${updatedTask.taskId}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {status.map((statusItem, index) => (
          <KanbanColumn
            title={statusItem}
            key={index}
            index={index.toString()}
            id={statusItem}
            tasksForColumn={tasks[statusItem]}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
