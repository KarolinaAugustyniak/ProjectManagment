import User from "./User";
import TaskComments from "./TaskComments";
import DeleteTask from "./DeleteTask";
import AssignTask from "./AssignTask";
import TaskDescription from "./TaskDescription";
import Deadline from "./Deadline";
import Task from "../interfaces/Task";
import CloseButton from "./CloseButton";

interface TaskCardDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskCardDetails = ({ task, onClose }: TaskCardDetailsProps) => {
  const { taskId, title, assignedToUser, createdByUser } = task;

  //task creation date
  const creationDate = new Date(task.creationDate);
  const formattedCreationDate = creationDate.toLocaleDateString();

  return (
    <>
      <div className="task-details">
        <div className="task-details__header">
          <h3 className="task-details__title">{title}</h3>
          <CloseButton onClick={onClose} />
        </div>
        <div className="task-details__content">
          <div className="task-details__created">
            Created by
            <User user={createdByUser} />
            on {formattedCreationDate}
          </div>
          <AssignTask assignedToUser={assignedToUser} task={task} />
          <TaskDescription task={task} />
          <Deadline task={task} />
          <DeleteTask taskId={taskId} />
          <TaskComments taskId={taskId} />
        </div>
      </div>
      <div className="popup-overlay" onClick={onClose}></div>
    </>
  );
};

export default TaskCardDetails;
