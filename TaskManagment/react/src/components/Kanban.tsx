// Kanban.tsx
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import { useTaskContext } from "../context/TaskContext";

const Kanban = ({ status }) => {
  const { tasks, setTasks } = useTaskContext();

  const onDragEnd = (result) => {
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
