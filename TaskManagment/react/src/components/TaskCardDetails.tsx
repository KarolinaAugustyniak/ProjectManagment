import React from "react";
import User from "./User";
import TaskComments from "./TaskComments";

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

  return (
    <>
      <div className="task-details">
        <div className="task-details__header">
          <h3 className="task-details__title">{title}</h3>
          <button className="task-details__close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="task-details__content">
          <div className="task-details__created">
            Created by
            <User
              username={createdByUser.username}
              image={createdByUser.profileImageFileName}
            />
            on {formattedCreationDate}{" "}
          </div>

          <div className="task-details__wrapper">
            <p className="task-details__name">Assigned to</p>
            {assignedToUser ? (
              <div>
                <User
                  username={assignedToUser.username}
                  image={assignedToUser.profileImageFileName}
                />
              </div>
            ) : (
              <div>
                <p className="task-details__not-assigned">Task not assigned</p>
              </div>
            )}
          </div>
          <TaskComments taskId={taskId} />
        </div>
      </div>
      <div className="popup-overlay" onClick={onClose}></div>
    </>
  );
};

export default TaskCardDetails;
