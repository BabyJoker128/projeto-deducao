import React, { useState } from 'react';
import api from '../../utils/api';

export default function NewCaseModal({ isOpen, onClose, onRefresh }) {
  const [formData, setFormData] = useState({ titulo: '', descricao: '', status: 'Aberto' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cases', formData);
      onRefresh(); // Atualiza a lista no Dashboard
      onClose();
    } catch (err) {
      console.error("Erro ao abrir arquivo.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="bg-dark-900 border border-blood-900 p-6 rounded shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-serif text-white mb-6 uppercase tracking-widest">Iniciar Nova Investigação</h2>
        <input 
          placeholder="Título do Caso" 
          className="w-full bg-black border border-dark-700 p-2 text-white mb-4 outline-none focus:border-blood-600"
          onChange={e => setFormData({...formData, titulo: e.target.value})}
          required
        />
        <textarea 
          placeholder="Resumo dos fatos..." 
          className="w-full bg-black border border-dark-700 p-2 text-white mb-4 h-32 outline-none focus:border-blood-600"
          onChange={e => setFormData({...formData, descricao: e.target.value})}
          required
        />
        <div className="flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 py-2 text-xs text-gray-500 uppercase">Cancelar</button>
          <button type="submit" className="flex-1 py-2 bg-blood-800 text-white text-xs font-bold uppercase hover:bg-blood-700">Registrar</button>
        </div>
      </form>
    </div>
  );
}