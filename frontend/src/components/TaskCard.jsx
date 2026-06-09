import React from 'react';
import { formatDate } from '../utils/formatters';
import { Trash2, Edit2, CheckCircle, Clock, Tag, User } from 'lucide-react';

export default function TaskCard({ task, onRemove, onChangeStatus, onEdit }) {
  const isDone = task.status === 'done';

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div 
      className={`task-card ${isDone ? 'task-done' : ''}`} 
      draggable 
      onDragStart={handleDragStart}
    >
      <div className="task-header">
        <h4 className="task-title">{task.desc}</h4>
        <div className="task-actions-icons">
          <button onClick={() => onEdit(task)} className="btn-icon"><Edit2 size={16} /></button>
          <button onClick={() => onRemove(task.id)} className="btn-icon text-danger"><Trash2 size={16} /></button>
        </div>
      </div>
      
      {task.observacao && <p className="task-obs">{task.observacao}</p>}
      
      <div className="task-badges">
        <span className="badge category"><Tag size={12}/> {task.category}</span>
        <span className={`badge urgency-${task.urgency.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`}>{task.urgency}</span>
      </div>
      
      <div className="task-meta">
        <div className="meta-item"><Clock size={12}/> Criado: {formatDate(task.createdAt)}</div>
        {task.requester && <div className="meta-item"><User size={12}/> {task.requester}</div>}
        {task.completedAt && <div className="meta-item text-success"><CheckCircle size={12}/> Concluído: {formatDate(task.completedAt)}</div>}
      </div>

      <div className="task-footer">
        <select value={task.status} onChange={e => onChangeStatus(task.id, e.target.value)} className="status-select">
          <option value="todo">A Fazer</option>
          <option value="in-progress">Em Andamento</option>
          <option value="done">Concluída</option>
        </select>
      </div>
    </div>
  );
}
