import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Task {
  id: number;
  title: string;
}

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.taskId.toString()} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
        >
           {task.title} 
        </li>
      )}
    </Draggable>
  );
}
