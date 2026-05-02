import React, { useState } from 'react';
import api from '../../utils/api';

export default function AddEvidenceModal({ caseId, isOpen, onClose, onRefresh }) {
  const [evidence, setEvidence] = useState({
    item: '',
    descricao: '',
    imagemUrl: '',
    localEncontrado: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Rota que criaremos no backend para dar "push" no array de evidências
      await api.put(`/cases/${caseId}/evidence`, evidence);
      onRefresh(); // Atualiza a página do dossier
      onClose();   // Fecha o modal
    } catch (err) {
      alert("Erro ao anexar evidência ao arquivo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-dark-900 border border-blood-900 w-full max-w-md p-6 rounded-lg shadow-2xl">
        <h2 className="text-xl font-serif text-white mb-6 uppercase tracking-widest border-b border-dark-800 pb-2">
          Anexar Nova Evidência
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Nome do Objeto/Evidência"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setEvidence({...evidence, item: e.target.value})}
            required
          />
          <textarea 
            placeholder="Descrição detalhada dos fatos..."
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 h-24 focus:border-blood-600 outline-none"
            onChange={e => setEvidence({...evidence, descricao: e.target.value})}
          />
          <input 
            placeholder="URL da Imagem (Link da foto)"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setEvidence({...evidence, imagemUrl: e.target.value})}
          />
          <input 
            placeholder="Localização da coleta"
            className="w-full bg-black border border-dark-700 p-2 text-sm text-gray-300 focus:border-blood-600 outline-none"
            onChange={e => setEvidence({...evidence, localEncontrado: e.target.value})}
          />
          
          <div className="flex gap-2 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-xs font-bold text-gray-500 hover:text-white uppercase">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-blood-700 hover:bg-blood-600 text-white text-xs font-bold uppercase transition-colors">
              Registrar no Dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}