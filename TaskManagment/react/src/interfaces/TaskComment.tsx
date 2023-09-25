import Task from "./Task";
import UserData from "./User";

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
