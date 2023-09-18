import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import User from './User';
import DueToDate from './DueToDate';
import TaskCardDetails from './TaskCardDetails';

interface Task {
  id: number;
  title: string;
}

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const {taskId, title, assignedToUser, dueDate } = task;
  
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  const openDetails = () => {
    setAreDetailsOpen(true);
  };

  const closeDetails = () => {
    setAreDetailsOpen(false);
  };

  return (
    <li>
    <Draggable draggableId={taskId.toString()} index={index}>
      {(provided) => (
        <div className='task-card'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
          onClick={openDetails}
        >
          <h3 className='task-card__title'> {title} </h3>
          {/* <ul className='task-card__labels'>
            <li className='task-card__label'>LABEL</li>
            <li className='task-card__label'>LABEL</li>
          </ul> */}
          <div className='task-card__bottom'>
            {assignedToUser ? <User username={assignedToUser.username} image={assignedToUser.profileImageFileName}/> :  <p className=''>Task not assigned</p> }
            <DueToDate date={dueDate} />
          </div>
        </div>
      )}
    </Draggable>
    {areDetailsOpen && (
      <TaskCardDetails task={task} onClose={closeDetails} />
    )}
    </li>
  );
}
