import React, { useState, useEffect } from 'react';
import { fetchCategories, createCategory } from '../services/api';

const DEFAULT_CATEGORIES = [
  "Desenvolvimento",
  "Suporte / Bug",
  "Reunião",
  "Documentação",
  "Administrativo",
  "Outros"
];

export default function TaskForm({ onAddTask }) {
  const [desc, setDesc] = useState('');
  const [observacao, setObservacao] = useState('');
  const [urgency, setUrgency] = useState('Baixa');
  
  const [dbCategories, setDbCategories] = useState([]);
  
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [requester, setRequester] = useState('');
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      const catNames = data.map(c => c.name);
      setDbCategories(catNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const allCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...dbCategories]));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    onAddTask({ desc, observacao, urgency, category, requester });
    setDesc('');
    setObservacao('');
    setUrgency('Baixa');
    setCategory(allCategories[0] || DEFAULT_CATEGORIES[0]);
    setRequester('');
  };

  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (trimmed && !allCategories.includes(trimmed)) {
      try {
        await createCategory(trimmed);
        await loadCategories();
        setCategory(trimmed);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else if (allCategories.includes(trimmed)) {
      setCategory(trimmed);
    }
    setIsAddingCategory(false);
    setNewCategoryName('');
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
            {!isAddingCategory ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: 1 }}>
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button 
                  type="button" 
                  onClick={() => setIsAddingCategory(true)}
                  style={{
                    padding: '0 0.5rem',
                    background: 'var(--panel-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                  title="Nova Categoria"
                >
                  +
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="Nome da categoria"
                  style={{ flex: 1 }}
                  autoFocus
                />
                <button 
                  type="button" 
                  onClick={handleAddCategory}
                  style={{
                    padding: '0 0.5rem',
                    background: 'var(--primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  OK
                </button>
                <button 
                  type="button" 
                  onClick={() => { setIsAddingCategory(false); setNewCategoryName(''); }}
                  style={{
                    padding: '0 0.5rem',
                    background: 'var(--panel-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    color: 'var(--text-color)',
                    cursor: 'pointer'
                  }}
                  title="Cancelar"
                >
                  X
                </button>
              </div>
            )}
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
