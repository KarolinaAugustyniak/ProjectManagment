import Task from "./Task";
import UserData from "./UserData";

interface TaskComment {
  commentId: number;
  taskId: number;
  commentText: string;
  commentedByUserID: number;
  commentDate: string;
  commentedByUser: UserData;
  taskItem: Task;
}

export default TaskComment;
