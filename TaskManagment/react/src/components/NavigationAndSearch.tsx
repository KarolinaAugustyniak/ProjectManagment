import React, { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import InputWithLabel from "./InputWithLabel";
import Search from "../assets/img/search.svg";

interface NavigationAndSearchProps {
  currentView: string;
  switchToKanbanView: () => void;
  switchToListView: () => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<{}>>;
}

const NavigationAndSearch: React.FC<NavigationAndSearchProps> = ({
  currentView,
  switchToKanbanView,
  switchToListView,
  setFilteredTasks,
}) => {
  const { tasks } = useTaskContext();
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const searchTerm = search.toLowerCase();
    const tasksForSearch = { ...tasks };

    for (const status in tasks) {
      const statusTasks = tasks[status].filter((task) => task.title.toLowerCase().includes(searchTerm));
      tasksForSearch[status] = statusTasks;
    }

    setFilteredTasks(tasksForSearch);
  };

  useEffect(() => {
    handleSearch();
  }, [tasks, search]);

  return (
    <section className="nav">
      <ul className="nav__list">
        <li onClick={switchToKanbanView} className={`nav__view ${currentView === "kanban" && "nav__view--active"}`}>
          Kanban board
        </li>
        <li onClick={switchToListView} className={`nav__view ${currentView === "list" && "nav__view--active"}`}>
          List
        </li>
      </ul>
      <InputWithLabel handleChange={handleSearchChange} name="search" img={Search} type="text" value={search} />
    </section>
  );
};

export default NavigationAndSearch;
