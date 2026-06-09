import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [desc, setDesc] = useState('');
  const [observacao, setObservacao] = useState('');
  const [urgency, setUrgency] = useState('Baixa');
  const [category, setCategory] = useState('Desenvolvimento');
  const [requester, setRequester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    onAddTask({ desc, observacao, urgency, category, requester });
    setDesc('');
    setObservacao('');
    setUrgency('Baixa');
    setCategory('Desenvolvimento');
    setRequester('');
  };

  return (
    <div className="panel form-panel">
      <h2>Nova Atividade</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título da Atividade</label>
          <input type="text" required value={desc} onChange={e => setDesc(e.target.value)} placeholder="O que precisa ser feito?" />
        </div>
        
        <div className="form-group">
          <label>Observação (Opcional)</label>
          <textarea value={observacao} onChange={e => setObservacao(e.target.value)} rows="2" placeholder="Detalhes adicionais..." />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Urgência</label>
            <select value={urgency} onChange={e => setUrgency(e.target.value)}>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Desenvolvimento">Desenvolvimento</option>
              <option value="Suporte / Bug">Suporte / Bug</option>
              <option value="Reunião">Reunião</option>
              <option value="Documentação">Documentação</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Solicitante</label>
          <input type="text" value={requester} onChange={e => setRequester(e.target.value)} placeholder="Quem solicitou? (Opcional)" />
        </div>

        <button type="submit" className="btn-primary">Criar Atividade</button>
      </form>
    </div>
  );
}
