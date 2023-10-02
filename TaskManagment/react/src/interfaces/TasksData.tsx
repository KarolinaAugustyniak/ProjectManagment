import Task from "./Task";

interface TasksData {
  "To do": Task[];
  "In Progress": Task[];
  Testing: Task[];
  Completed: Task[];
}

export default TasksData;
