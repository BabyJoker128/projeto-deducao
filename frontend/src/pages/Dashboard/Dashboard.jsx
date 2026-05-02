import React, { useEffect, useState } from 'react';
import { Search, FolderLock, FileText, Map, Users, LogOut, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import backgroundCrime from '../../assets/background-crime.png';

// 1. Casos base que aparecem para TODOS (definidos fora da função)
const STARTER_CASES = [
  {
    _id: 'tutorial-001',
    titulo: 'Tutorial: Procedimentos de Campo',
    descricao: 'Aprenda a registrar evidências e identificar suspeitos no sistema central.',
    status: 'Aberto',
    dataRegistro: new Date().toISOString(),
    suspeitos: [],
    evidencias: []
  },
  {
    _id: 'case-001',
    titulo: 'O Relógio Quebrado',
    descricao: 'Um relógio de bolso encontrado parado às 03:14 na cena do crime.',
    status: 'Em Andamento',
    dataRegistro: '2026-05-01T10:00:00Z',
    suspeitos: [],
    evidencias: []
  },
  {
    _id: 'case-002',
    titulo: 'Sombra no Beco',
    descricao: 'Relatos de uma figura encapuzada vista nos arredores do Distrito Leste.',
    status: 'Aberto',
    dataRegistro: '2026-05-02T14:30:00Z',
    suspeitos: [],
    evidencias: []
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [cases, setCases] = useState(STARTER_CASES);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    try {
      const response = await api.get('/cases');
      // Filtra para garantir que "Ouro e Cinzas" não apareça
      const dbCases = response.data.filter(c => c.titulo !== 'Ouro e Cinzas');
      
      setCases(prev => {
        const existingIds = new Set(prev.map(c => c._id));
        const newUniqueCases = dbCases.filter(c => !existingIds.has(c._id));
        return [...prev, ...newUniqueCases];
      });
    } catch (err) {
      console.error("Servidor Offline: Usando arquivos locais.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const casosAtivos = cases.filter(c => c.status !== 'Fechado');
  const casosEncerrados = cases.filter(c => c.status === 'Fechado');

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 font-sans flex overflow-hidden">
      <div 
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${backgroundCrime})` }}
>
  
      {/* SIDEBAR */}
      <aside className="relative z-10 w-64 bg-black/90 backdrop-blur-xl border-r border-dark-800 flex flex-col justify-between p-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blood-700 rounded flex items-center justify-center border border-blood-900">
               <ShieldAlert className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-serif text-white tracking-wider">ARQUIVO</h1>
              <p className="text-[10px] text-blood-600 font-bold tracking-[0.2em]">DEPARTAMENTO</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <NavItem icon={<FolderLock size={18}/>} label="Casos Ativos" active />
            <NavItem icon={<FileText size={18}/>} label="Evidências" />
            <NavItem icon={<Users size={18}/>} label="Suspeitos" />
            <NavItem icon={<Map size={18}/>} label="Mapa da Cidade" />
          </nav>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('token'); navigate('/acesso'); }}
          className="flex items-center gap-3 text-gray-500 hover:text-blood-600 p-3 transition-colors font-mono text-xs"
        >
          <LogOut size={16} /> ENCERRAR TURNO
        </button>
      </aside>

      {/* MURAL PRINCIPAL */}
      <main className="relative z-10 flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10 border-b border-dark-800 pb-6">
          <div>
            <h2 className="text-4xl font-serif text-gray-100 italic">Painel de Operações</h2>
            <p className="text-gray-500 text-sm mt-2 font-mono uppercase tracking-tighter">
              Acesso autorizado. {casosAtivos.length} investigações disponíveis.
            </p>
          </div>
        </header>

        <section className="mb-12">
          <h3 className="text-blood-600 text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-blood-600"></span> Mural de Casos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casosAtivos.map((caso) => (
              <CaseFolder key={caso._id} caso={caso} onClick={() => navigate(`/caso/${caso._id}`)} />
            ))}
            <div className="bg-dark-900/40 border-2 border-dashed border-dark-800 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 hover:text-blood-500 hover:border-blood-900 transition-all cursor-pointer min-h-[200px] group">
               <span className="text-4xl mb-2 font-thin group-hover:scale-125 transition-transform">+</span>
               <p className="font-serif tracking-wide text-sm">Abrir Novo Dossiê</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Sub-componentes auxiliares
function NavItem({ icon, label, active = false }) {
  return (
    <button className={`flex items-center gap-3 p-3 rounded transition-all w-full text-left font-serif ${active ? 'bg-blood-900/20 text-white border-l-2 border-blood-600' : 'text-gray-500 hover:text-gray-300'}`}>
      {icon} {label}
    </button>
  );
}

function CaseFolder({ caso, closed = false, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`relative bg-gradient-to-br from-[#1a1a1a] to-black border ${closed ? 'border-dark-800' : 'border-dark-700 hover:border-blood-600'} p-6 rounded-md transition-all cursor-pointer shadow-2xl group`}
    >
      <FolderLock className={`mb-4 ${closed ? 'text-gray-700' : 'text-blood-600 group-hover:scale-110 transition-transform'}`} size={32} />
      <h4 className="text-lg font-serif text-gray-200 uppercase tracking-tighter mb-1 leading-tight">{caso.titulo}</h4>
      <p className="text-[10px] text-gray-600 font-mono mb-4">REGISTRO: {new Date(caso.dataRegistro).toLocaleDateString()}</p>
      <div className="flex gap-4 border-t border-dark-800 pt-4 mt-4">
        <span className="flex items-center gap-1 text-[10px] text-gray-500"><Users size={12}/> {caso.suspeitos?.length || 0} Suspeitos</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-500"><FileText size={12}/> {caso.evidencias?.length || 0} Evidências</span>
      </div>
    </div>
  );
}