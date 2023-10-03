import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import User from "./User";
import TaskCardDetails from "./TaskCardDetails";
import Task from "../interfaces/Task";

interface TaskListElementProps {
  task: Task;
  index: number;
}

export default function TaskListElement({ task, index }: TaskListElementProps) {
  const { taskId, title, assignedToUser, dueDate } = task;

  const date = new Date(dueDate);

  const formattedDate = date.toLocaleDateString();

  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  const openDetails = () => {
    setAreDetailsOpen(true);
  };

  const closeDetails = () => {
    setAreDetailsOpen(false);
  };

  return (
    <li>
      <Draggable draggableId={taskId.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list__position"
            onClick={openDetails}
          >
            <div className="list__task-title list__element"> {title} </div>
            <div className="list__task-user list__element">
              {assignedToUser ? (
                <User user={assignedToUser} />
              ) : (
                <p className="gray-text">Task not assigned</p>
              )}
            </div>
            <div className="list__task-date list__element">
              {dueDate ? (
                <p>{formattedDate}</p>
              ) : (
                <p className="gray-text">Deadline not set</p>
              )}
            </div>
          </div>
        )}
      </Draggable>
      {areDetailsOpen && <TaskCardDetails task={task} onClose={closeDetails} />}
    </li>
  );
}
