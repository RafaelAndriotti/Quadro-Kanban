import React, { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import BoardColumn from '../components/BoardColumn';
import Calendar from '../components/Calendar';
import { toLocalDateStr } from '../utils/formatters';
import { Sun, Moon } from 'lucide-react';

export default function Dashboard() {
  const { tasks, loading, addTask, changeStatus, editTask, removeTask } = useTasks();
  const [selectedDateFilter, setSelectedDateFilter] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const filteredTasks = selectedDateFilter 
    ? tasks.filter(t => toLocalDateStr(t.createdAt) === selectedDateFilter)
    : tasks;

  const todoTasks = filteredTasks.filter(t => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress');
  const doneTasks = filteredTasks.filter(t => t.status === 'done');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(editingTask.id, editingTask.desc, editingTask.observacao);
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Registro de Tarefas</h1>
          <p>Gerencie suas atividades com eficiência</p>
        </div>
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Alternar tema">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className="app-main">
        <aside className="sidebar-left">
          <TaskForm onAddTask={addTask} />
          <Calendar 
            tasks={tasks} 
            selectedDate={selectedDateFilter} 
            onSelectDate={setSelectedDateFilter} 
          />
        </aside>

        <section className="board-section">
          {loading ? (
            <div className="loading-state" style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem'}}>
              Carregando tarefas...
            </div>
          ) : (
            <>
              <BoardColumn 
                title="A Fazer" 
                status="todo" 
                tasks={todoTasks} 
                onRemove={removeTask} 
                onChangeStatus={changeStatus}
                onEdit={setEditingTask}
              />
              <BoardColumn 
                title="Em Andamento" 
                status="in-progress" 
                tasks={inProgressTasks} 
                onRemove={removeTask} 
                onChangeStatus={changeStatus}
                onEdit={setEditingTask}
              />
              <BoardColumn 
                title="Concluídas" 
                status="done" 
                tasks={doneTasks} 
                onRemove={removeTask} 
                onChangeStatus={changeStatus}
                onEdit={setEditingTask}
              />
            </>
          )}
        </section>
      </main>

      {/* Modal de Edição */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content panel">
            <h2>Editar Atividade</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input 
                  type="text" 
                  required 
                  value={editingTask.desc} 
                  onChange={e => setEditingTask({...editingTask, desc: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Observação</label>
                <textarea 
                  value={editingTask.observacao || ''} 
                  onChange={e => setEditingTask({...editingTask, observacao: e.target.value})} 
                  rows="3" 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingTask(null)}>Cancelar</button>
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
