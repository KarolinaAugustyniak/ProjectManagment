import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCardDetails from "./TaskCardDetails";
import Task from "../interfaces/Task";
import TaskCard from "./TaskCard";

interface TaskCardDraggableProps {
  task: Task;
  index: number;
}

export default function TaskCardDraggable({
  task,
  index,
}: TaskCardDraggableProps) {
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  const openDetails = () => {
    setAreDetailsOpen(true);
  };

  const closeDetails = () => {
    setAreDetailsOpen(false);
  };

  return (
    <li>
      <Draggable draggableId={task.taskId.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskCard task={task} onClick={openDetails} />
          </div>
        )}
      </Draggable>
      {areDetailsOpen && <TaskCardDetails task={task} onClose={closeDetails} />}
    </li>
  );
}
