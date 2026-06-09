import React from 'react';
import TaskCard from './TaskCard';

export default function BoardColumn({ title, status, tasks, onRemove, onChangeStatus, onEdit }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onChangeStatus(taskId, status);
    }
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div 
        className="task-list"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onRemove={onRemove} 
            onChangeStatus={onChangeStatus}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
