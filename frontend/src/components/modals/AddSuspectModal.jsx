import React, { useState } from 'react';
import api from '../../utils/api';

export default function AddSuspectModal({ caseId, isOpen, onClose, onRefresh }) {
  const [suspect, setSuspect] = useState({
    nome: '',
    ocupacao: '',
    imagemUrl: '',
    vinculo: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chamada para a rota que criamos no backend
      await api.put(`/cases/${caseId}/suspect`, suspect);
      onRefresh(); // Recarrega o dossier para mostrar o novo suspeito
      onClose();
    } catch (err) {
      alert("Erro ao registrar suspeito no sistema.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-blood-900 w-full max-w-md p-6 rounded shadow-2xl">
        <h2 className="text-xl font-serif text-white mb-6 uppercase tracking-widest border-b border-dark-800 pb-2">Identificar Novo Suspeito</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Nome Completo"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setSuspect({...suspect, nome: e.target.value})}
            required
          />
          <input 
            placeholder="Ocupação / Cargo"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setSuspect({...suspect, ocupacao: e.target.value})}
          />
          <input 
            placeholder="URL da Imagem do Perfil"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setSuspect({...suspect, imagemUrl: e.target.value})}
          />
          <input 
            placeholder="Vínculo com o caso"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setSuspect({...suspect, vinculo: e.target.value})}
          />
          
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-xs font-bold text-gray-500 uppercase hover:text-white">Abortar</button>
            <button type="submit" className="flex-1 py-2 bg-blood-800 hover:bg-blood-700 text-white text-xs font-bold uppercase transition-all">Registrar Indivíduo</button>
          </div>
        </form>
      </div>
    </div>
  );
}