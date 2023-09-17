import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import User from './User';
import DueToDate from './DueToDate';

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
  return (
    <Draggable draggableId={taskId.toString()} index={index}>
      {(provided) => (
        <li className='task-card'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
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
        </li>
      )}
    </Draggable>
  );
}
