import React from 'react';
import {DragDropContext}  from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
 
const Kanban = ({ tasks }) => {
  // Filter tasks based on their status
  const todoTasks = tasks.filter((task) => task.status === 0);
  const inProgressTasks = tasks.filter((task) => task.status === 1);
  const testingTasks = tasks.filter((task) => task.status === 2);
  const completedTasks = tasks.filter((task) => task.status === 3);

  const onDragEnd = result => {
    const {destination, source, draggableId}=result;

    if(!destination){
      return;
    }

    if(destination.droppableId === source.droppableId &&
       destination.index === source.index
    ){
      return;
    }


  }

  return (
    <DragDropContext 
    onDragEnd={onDragEnd}
    >
        <div className="kanban-board">
          <KanbanColumn title="To Do" id="0" tasks={todoTasks} />
          <KanbanColumn title="In Progress" id="1" tasks={inProgressTasks} />
          <KanbanColumn title="Testing" id="2" tasks={testingTasks} />
          <KanbanColumn title="Completed" id="3" tasks={completedTasks} />
        </div>
    </DragDropContext>
  );
};

export default Kanban;
