export const API_URL = 'http://localhost:3000/api/tasks';

export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Falha ao carregar as tarefas');
  return res.json();
};

export const createTask = async (taskData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!res.ok) throw new Error('Falha ao criar tarefa');
  return res.json();
};

export const updateTaskStatus = async (id, status, completedAt) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, completedAt })
  });
  if (!res.ok) throw new Error('Falha ao atualizar status da tarefa');
  return res.json();
};

export const updateTaskDetails = async (id, desc, observacao) => {
  const res = await fetch(`${API_URL}/${id}/details`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desc, observacao })
  });
  if (!res.ok) throw new Error('Falha ao atualizar detalhes da tarefa');
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Falha ao deletar a tarefa');
  return res.json();
};
