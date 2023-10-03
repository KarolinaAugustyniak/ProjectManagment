import User from "./User";
import DueToDate from "./DueToDate";
import Task from "../interfaces/Task";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { title, assignedToUser, dueDate } = task;

  return (
    <div className="task-card" onClick={onClick}>
      <h3 className="task-card__title"> {title} </h3>
      <div className="task-card__bottom">
        {assignedToUser ? (
          <User user={assignedToUser} />
        ) : (
          <p>Task not assigned</p>
        )}
        <DueToDate date={dueDate} />
      </div>
    </div>
  );
}
