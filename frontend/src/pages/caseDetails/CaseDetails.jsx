import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Users, MapPin, ArrowLeft, ShieldAlert, Info } from 'lucide-react';
import api from '../../utils/api';
import AddEvidenceModal from '../../components/modals/AddEvidenceModal';
import AddSuspectModal from '../../components/modals/AddSuspectModal';

// 1. BANCO DE DADOS LOCAL (Casos Iniciais e Tutoriais)
const DOSSIERS_DATABASE = {
  'tutorial-001': {
    titulo: "Tutorial: Procedimentos de Campo",
    status: "MODO DE INSTRUÇÃO",
    descricao: "Este dossiê serve para familiarizar o detetive com a interface. Aprenda a catalogar suspeitos e organizar o mural de evidências.",
    suspeitos: [
      { nome: "John Doe (Exemplo)", ocupacao: "Zelador", vinculo: "Primeiro no local", imagemUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" }
    ],
    evidencias: [
      { item: "Chave Mestra", localEncontrado: "Corredor de Serviço", imagemUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  'case-001': {
    titulo: "O Relógio Quebrado",
    status: "EM ANDAMENTO",
    descricao: "Vítima: Arthur Sterling, 68 anos. Encontrado na biblioteca trancada por dentro. A perícia aponta parada cardíaca, mas os danos no relógio e o depoimento divergente da equipe da casa apontam para homicídio.",
    materiais: [
      { tipo: 'PDF', nome: 'Laudo Necroscópico #ST-2026', url: 'https://docs.google.com/document/d/1JI2Tnh-0N3XYLXR9jeofsjDQ64oBIs0bL_HUWmSZ5KU/edit?usp=drive_web' }
    ],
    habilidades: ["Observação", "Análise Crítica"],
    suspeitos: [
      { nome: "Eleanor Sterling", ocupacao: "Sobrinha da Vítima", vinculo: "Única herdeira direta", imagemUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
      { nome: "Marcus Vane", ocupacao: "Mordomo", vinculo: "Trabalha na casa há 20 anos", imagemUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" }
    ],
    evidencias: [
      { item: "Relógio de Prata", localEncontrado: "Sob a mesa principal", imagemUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=200&auto=format&fit=crop" },
      { item: "Taça de Vinho", localEncontrado: "Mesa lateral", imagemUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  'case-002': {
    titulo: "Sombra no Beco",
    status: "ABERTO",
    descricao: "Ocorrência 402. Disparos no Distrito Leste. A cápsula de 9mm indica execução profissional. O atirador fugiu, deixando apenas uma pegada improvável para a região.",
    materiais: [
      { tipo: 'DOC', nome: 'Termo de Depoimento #DE-402', url: 'https://docs.google.com/document/d/116eMKxqvKSrkQz6A6dsrJGmhCPoGN9u5QQN1XIbYamA/edit?usp=drive_web' }
    ],
    habilidades: ["Dedução Lógica", "Atenção a Detalhes"],
    suspeitos: [
      { nome: "O Vagante", ocupacao: "Desemplo", vinculo: "Testemunha ocular", imagemUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" }
    ],
    evidencias: [
      { item: "Cápsula 9mm", localEncontrado: "Atrás da lixeira", imagemUrl: "https://images.unsplash.com/photo-1584241639913-90d2358897f1?q=80&w=200&auto=format&fit=crop" },
      { item: "Pedaço de Tecido Azul", localEncontrado: "Preso na grade", imagemUrl: "https://images.unsplash.com/photo-1524230653544-013898666060?q=80&w=200&auto=format&fit=crop" }
    ]
  }
};

export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caso, setCaso] = useState(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showSuspectModal, setShowSuspectModal] = useState(false);
  const [hipotese, setHipotese] = useState(""); // Captura a teoria do agente

  const fetchDossier = async () => {
    if (DOSSIERS_DATABASE[id]) {
      setCaso(DOSSIERS_DATABASE[id]);
      return;
    }

    try {
      const response = await api.get(`/cases/${id}`);
      setCaso(response.data);
    } catch (err) {
      console.error("Dossiê não encontrado.");
      navigate('/painel');
    }
  };

  useEffect(() => {
    fetchDossier();
  }, [id]);

  // Função para validar a teoria do agente
  const validarTeoria = () => {
    const h = hipotese.toLowerCase();
    
    if (id === 'case-001') {
      // Validação baseada no laudo: Relógio travado às 03:14[cite: 1]
      if (h.includes("03:14") || (h.includes("mordomo") && h.includes("mentiu"))) {
        alert("SISTEMA: Dedução correta. A contradição temporal confirma a manipulação da cena!");
      } else {
        alert("SISTEMA: Conclusão inconsistente com as provas físicas.");
      }
    } else if (id === 'case-002') {
      // Validação baseada no depoimento: Lama/Argila vermelha[cite: 2]
      if (h.includes("lama") || h.includes("argila") || h.includes("construção")) {
        alert("SISTEMA: Hipótese validada. A origem da lama rastreia o suspeito até o Distrito Norte!");
      } else {
        alert("SISTEMA: Falta de evidência física na teoria apresentada.");
      }
    } else {
      alert("SISTEMA: Aguardando mais evidências para validação.");
    }
  };

  if (!caso) return <div className="bg-black h-screen flex items-center justify-center text-blood-600 font-mono">DESCRIPTOGRAFANDO...</div>;

  const isTutorial = id === 'tutorial-001';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 p-8 pb-20">
      {/* HEADER E VOLTAR */}
      <button 
        onClick={() => navigate('/painel')}
        className="flex items-center gap-2 text-blood-600 hover:text-blood-400 transition-colors mb-8 font-mono text-xs"
      >
        <ArrowLeft size={16} /> VOLTAR AO ARQUIVO CENTRAL
      </button>

      {isTutorial && (
        <div className="bg-blood-900/10 border border-blood-800/40 p-4 mb-8 rounded flex gap-4 items-center animate-pulse">
          <Info className="text-blood-600" size={20} />
          <p className="text-[10px] text-gray-400 font-mono uppercase">Protocolo de Treinamento: Analise as evidências abaixo.</p>
        </div>
      )}

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        
        {/* COLUNA 1: RELATÓRIO E MATERIAIS */}
        <section className="space-y-6">
          <div className="border-l-4 border-blood-700 pl-4">
            <h1 className="text-3xl font-serif text-white uppercase tracking-tighter leading-tight">{caso.titulo}</h1>
            <p className="text-blood-600 font-mono text-[10px] mt-1 tracking-widest">{caso.status}</p>
          </div>
          
          <div className="bg-dark-900/30 p-6 rounded border border-dark-800 shadow-inner">
            <h3 className="flex items-center gap-2 text-gray-100 font-bold mb-4 uppercase text-[10px] tracking-widest">
              <FileText size={14} className="text-blood-600"/> Resumo do Inquérito
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 italic">"{caso.descricao}"</p>
          </div>

          {/* SEÇÃO DE MATERIAIS E HABILIDADES */}
          <div className="bg-dark-900/40 p-5 rounded border border-dark-800">
            <h4 className="text-[10px] text-blood-600 font-bold uppercase tracking-widest mb-4">Arquivos de Inteligência</h4>
            <div className="space-y-2">
              {caso.materiais?.map((m, i) => (
                <div 
                  key={i} 
                  onClick={() => window.open(m.url, '_blank')}
                  className="flex items-center justify-between bg-black/40 p-3 rounded border border-dark-700 group hover:border-blood-900 transition-all cursor-pointer active:scale-95"
                >
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-white">[{m.tipo}] {m.nome}</span>
                  <FileText size={12} className="text-gray-600 group-hover:text-blood-600" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-dark-800">
              <p className="text-[8px] text-gray-600 uppercase mb-2">Habilidades Necessárias:</p>
              <div className="flex gap-2">
                {caso.habilidades?.map((h, i) => (
                  <span key={i} className="px-2 py-1 bg-blood-900/10 border border-blood-900/30 text-[8px] text-blood-400 rounded uppercase font-mono">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COLUNA 2: SUSPEITOS */}
        <section>
          <h3 className="flex items-center gap-2 text-gray-100 font-bold mb-6 uppercase text-[10px] tracking-widest">
            <Users size={14} className="text-blood-600"/> Banco de Dados: Suspeitos
          </h3>
          <div className="space-y-4">
            {caso.suspeitos?.map((s, index) => (
              <div key={index} className="flex gap-4 bg-dark-900/50 p-3 rounded border border-dark-800 group hover:border-gray-700 transition-all">
                <div className="w-16 h-16 bg-black rounded overflow-hidden border border-dark-700 shadow-lg grayscale group-hover:grayscale-0 transition-all">
                  <img src={s.imagemUrl || 'https://via.placeholder.com/150'} alt={s.nome} className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs">{s.nome}</h4>
                  <p className="text-[9px] text-blood-600 uppercase font-mono">{s.ocupacao}</p>
                  <p className="text-[9px] text-gray-500 mt-1 italic">Vínculo: {s.vinculo}</p>
                </div>
              </div>
            ))}
            <button onClick={() => setShowSuspectModal(true)} className="w-full py-2 border border-dashed border-dark-800 text-gray-600 text-[9px] hover:text-gray-400 transition-all uppercase font-bold tracking-tighter">+ Registrar Indiciado</button>
          </div>
        </section>

        {/* COLUNA 3: EVIDÊNCIAS */}
        <section>
          <h3 className="flex items-center gap-2 text-gray-100 font-bold mb-6 uppercase text-[10px] tracking-widest">
            <MapPin size={14} className="text-blood-600"/> Galeria de Provas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {caso.evidencias?.map((e, index) => (
              <div key={index} className="aspect-square bg-dark-900/50 border border-dark-800 rounded overflow-hidden relative group cursor-help">
                <img src={e.imagemUrl} alt={e.item} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all" />
                <div className="absolute inset-0 bg-blood-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 p-2 bg-black/90 w-full text-[8px] border-t border-dark-800">
                  <p className="text-white font-bold truncate">{e.item}</p>
                </div>
              </div>
            ))}
            <button onClick={() => setShowEvidenceModal(true)} className="aspect-square border border-dashed border-dark-800 flex flex-col items-center justify-center text-gray-600 hover:text-blood-600 transition-all">
              <span className="text-xl">+</span>
              <span className="text-[8px] font-bold uppercase">Anexar Foto</span>
            </button>
          </div>
        </section>
      </div>

      {/* 2. TERMINAL DE DEDUÇÃO (Interatividade) */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-black border border-blood-900 p-8 rounded-lg shadow-[0_0_40px_rgba(153,27,27,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <ShieldAlert size={80} />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="text-blood-600 animate-pulse" size={20} />
            <h3 className="text-white font-mono text-xs tracking-[0.4em] uppercase">Delegado Virtual: Validação de Hipótese</h3>
          </div>

          <textarea 
            value={hipotese}
            onChange={(e) => setHipotese(e.target.value)}
            className="w-full bg-dark-900/50 border border-dark-800 p-4 text-sm text-gray-300 outline-none focus:border-blood-600 h-32 font-serif italic transition-all placeholder:text-gray-700 shadow-inner"
            placeholder="Relate sua conclusão aqui. Identifique contradições e conecte as provas físicas..."
          />

          <div className="mt-6 flex justify-between items-center border-t border-dark-800 pt-6">
            <div className="space-y-1">
              <p className="text-[8px] text-gray-600 font-mono uppercase tracking-widest">Habilidades: Observação | Dedução Lógica</p>
              <p className="text-[8px] text-blood-900 font-mono uppercase tracking-widest italic">Aviso: Conclusões precipitadas podem comprometer o inquérito.</p>
            </div>
            <button 
              onClick={validarTeoria}
              className="px-10 py-3 bg-blood-800 hover:bg-blood-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
            >
              Validar Teoria
            </button>
          </div>
        </div>
      </div>

      {/* MODAIS */}
      <AddEvidenceModal caseId={id} isOpen={showEvidenceModal} onClose={() => setShowEvidenceModal(false)} onRefresh={fetchDossier} />
      <AddSuspectModal caseId={id} isOpen={showSuspectModal} onClose={() => setShowSuspectModal(false)} onRefresh={fetchDossier} />
    </div>
  );
}