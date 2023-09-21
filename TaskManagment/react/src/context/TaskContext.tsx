import React, { createContext, useContext, useState, ReactNode } from "react";

type TasksState = {
  "To do": any[];
  "In Progress": any[];
  Testing: any[];
  Completed: any[];
};

type TaskContextType = {
  tasks: TasksState;
  setTasks: React.Dispatch<React.SetStateAction<TasksState>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// TaskProvider component to wrap app
interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<TasksState>({
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
