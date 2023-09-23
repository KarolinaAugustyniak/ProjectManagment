import React from "react";
import User from "./User";
import TaskComments from "./TaskComments";
import DeleteTask from "./DeleteTask";
import CloseIcon from "../assets/img/close.svg";
import AssignTask from "./AssignTask";
import TaskDescription from "./TaskDescription";

interface Task {
  id: number;
  title: string;
  assignedToUser?: {
    username: string;
    profileImageFileName: string;
  };
  dueDate?: Date;
}

interface TaskCardDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskCardDetails: React.FC<TaskCardDetailsProps> = ({ task, onClose }) => {
  const { taskId, title, assignedToUser, dueDate, description, createdByUser } =
    task;

  //task creation date
  const creationDate = new Date(task.creationDate);
  const formattedCreationDate = creationDate.toLocaleDateString();

  console.log(task);
  return (
    <>
      <div className="task-details">
        <div className="task-details__header">
          <h3 className="task-details__title">{title}</h3>
          <button className="task-details__close" onClick={onClose}>
            <img src={CloseIcon} alt="close" />
          </button>
        </div>

        <div className="task-details__content">
          <div className="task-details__created">
            Created by
            <User user={createdByUser} />
            on {formattedCreationDate}{" "}
          </div>

          <AssignTask assignedToUser={assignedToUser} task={task} />
          <TaskDescription task={task} />

          <DeleteTask taskId={taskId} />
          <TaskComments taskId={taskId} />
        </div>
      </div>
      <div className="popup-overlay" onClick={onClose}></div>
    </>
  );
};

export default TaskCardDetails;
