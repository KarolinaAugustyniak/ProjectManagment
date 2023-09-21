import Project from "./Project";
import TaskComment from "./TaskComment";
import UserData from "./UserData";

interface Task {
  taskId: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: string | null;
  creationDate: string;
  projectId: number;
  created_By: number;
  assignedTo: number | null;
  project: Project;
  createdByUser: UserData;
  assignedToUser: UserData | null;
  taskComments: TaskComment[];
}

enum TaskStatus {
  ToDo,
  InProgress,
  Testing,
  Completed,
}

export default Task;
