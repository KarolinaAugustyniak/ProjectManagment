import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

interface NavigationAndSearchProps {
  switchToKanbanView: () => void;
  switchToListView: () => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<{}>>;
}

const NavigationAndSearch: React.FC<NavigationAndSearchProps> = ({
  switchToKanbanView,
  switchToListView,
  setFilteredTasks,
}) => {
  const { tasks } = useTaskContext();
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const tasksForSearch = { ...tasks };

    for (const status in tasks) {
      const statusTasks = tasks[status].filter((task) => task.title.toLowerCase().includes(searchTerm));
      tasksForSearch[status] = statusTasks;
    }

    setFilteredTasks(tasksForSearch);
  };

  return (
    <div className="">
      <ul>
        <li onClick={switchToKanbanView}>Kanban board</li>
        <li onClick={switchToListView}>List</li>
      </ul>
      <input type="text" value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default NavigationAndSearch;
