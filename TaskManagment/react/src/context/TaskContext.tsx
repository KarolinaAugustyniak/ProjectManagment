import { createContext, useContext, useState, ReactNode } from "react";
import TasksData from "../interfaces/TasksData";

type TaskContextType = {
  tasks: TasksData;
  setTasks: React.Dispatch<React.SetStateAction<TasksData>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// TaskProvider component to wrap app
interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<TasksData>({
    "To do": [],
    "In Progress": [],
    Testing: [],
    Completed: [],
  });

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

//custom hook to access the TaskContext
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
