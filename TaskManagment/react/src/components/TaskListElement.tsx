import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import User from "./User";
import DueToDate from "./DueToDate";
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
    <li className="list__li">
      <Draggable draggableId={taskId.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list__element"
            onClick={openDetails}
          >
            <div className="list__task-title"> {title} </div>
            <div className="list__task-user"> {assignedToUser ? <User user={assignedToUser} /> : <></>}</div>
            <div className="list__task-date">{dueDate ? <p>{formattedDate}</p> : <></>}</div>
          </div>
        )}
      </Draggable>
      {areDetailsOpen && <TaskCardDetails task={task} onClose={closeDetails} />}
    </li>
  );
}
