import React, { useState } from 'react';
import api from '../../utils/api';

export default function NewCaseForm({ onCaseCreated }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    dificuldade: 'Médio'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // O interceptor que configuramos enviará o token automaticamente
      await api.post('/cases', formData);
      alert('Novo caso registrado no sistema.');
      setFormData({ titulo: '', descricao: '', dificuldade: 'Médio' });
      onCaseCreated(); // Atualiza a lista de casos automaticamente
    } catch (err) {
      alert('Falha ao registrar caso: ' + (err.response?.data?.msg || 'Erro de conexão'));
    }
  };

  return (
    <div className="bg-dark-900 p-6 rounded-lg border border-dark-800 shadow-xl">
      <h3 className="text-xl text-gray-100 font-bold mb-4 uppercase tracking-wider">Registrar Nova Ocorrência</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 uppercase mb-1">Título do Caso</label>
          <input 
            type="text"
            required
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            className="w-full bg-black border border-dark-700 rounded p-2 text-gray-200 focus:border-blood-600 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase mb-1">Descrição / Evidências Iniciais</label>
          <textarea 
            required
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            className="w-full bg-black border border-dark-700 rounded p-2 text-gray-200 h-24 focus:border-blood-600 outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase mb-1">Nível de Dificuldade</label>
          <select 
            value={formData.dificuldade}
            onChange={(e) => setFormData({...formData, dificuldade: e.target.value})}
            className="w-full bg-black border border-dark-700 rounded p-2 text-gray-200 focus:border-blood-600 outline-none"
          >
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blood-700 hover:bg-blood-800 text-white py-2 rounded font-bold transition-colors">
          ARQUIVAR NO SISTEMA
        </button>
      </form>
    </div>
  );
}