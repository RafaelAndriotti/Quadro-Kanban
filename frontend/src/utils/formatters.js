export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

export const toLocalDateStr = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const getStatusLabel = (status) => {
  if (status === 'todo') return 'A Fazer';
  if (status === 'in-progress') return 'Em Andamento';
  if (status === 'done') return 'Concluída';
  return status;
};
