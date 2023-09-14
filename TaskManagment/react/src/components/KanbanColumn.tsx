import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  title: string;
}

interface KanbanColumnProps {
  title: string;
  id: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, id, tasks }) => {
  return (
    <div className='kanban__column'>
      <h2 className='kanban__title'>{title}</h2>
      <Droppable droppableId={id}>
        {provided =>(
          <ul ref={provided.innerRef}
          {...provided.droppableProps}
          className='kanban__list'
          >
              {(tasks as Task[]).map((task, index) => (
              <TaskCard key={task.taskId} task={task} index={index}/>
              ))}
              {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
