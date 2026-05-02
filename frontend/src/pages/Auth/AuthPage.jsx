import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import GlassCard from '../../components/ui/GlassCard';
import { Mail, Lock, User, EyeOff, Eye } from 'lucide-react';
import api from '../../utils/api'; // Certifique-se que este arquivo existe em src/utils/api.js

export default function AuthPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Estados para capturar os dados do LOGIN
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });

  // Estados para capturar os dados do CADASTRO
  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });

  // Lógica de LOGIN
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/auth/login', {
      email: loginData.email,
      senha: loginData.senha
    });

    // Guarda o token para o sistema saber que você está logado
    localStorage.setItem('token', response.data.token);
    
    alert(`Bem-vindo de volta, detetive ${response.data.user.nome}!`);
    navigate('/painel'); 
  } catch (err) {
    alert(err.response?.data?.msg || 'Erro ao acessar o sistema.');
  }
};

  // Lógica de CADASTRO (Conectada ao Backend)
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.senha !== registerData.confirmaSenha) {
      alert('[ERRO] As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        nome: registerData.nome,
        email: registerData.email,
        senha: registerData.senha
      });

      alert(response.data.msg); 
      // Limpa os campos após sucesso
      setRegisterData({ nome: '', email: '', senha: '', confirmaSenha: '' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Erro ao conectar com o Arquivo Central.');
    }
  };

  return (
    <AuthLayout>
      {/* SEÇÃO DE LOGIN */}
      <GlassCard>
        <div className="text-center mb-8">
          <p className="text-blood-600 text-xs font-bold tracking-[0.2em] uppercase mb-2">Acesso Restrito</p>
          <h2 className="text-3xl text-gray-100 font-serif tracking-wide">LOGIN</h2>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 flex-grow">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="email" 
              placeholder="seu@email.com" 
              required
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full bg-black/50 border border-dark-800 rounded text-gray-200 pl-10 pr-4 py-2.5 focus:outline-none focus:border-blood-600 transition-colors" 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Sua senha" 
              required
              value={loginData.senha}
              onChange={(e) => setLoginData({...loginData, senha: e.target.value})}
              className="w-full bg-black/50 border border-dark-800 rounded text-gray-200 pl-10 pr-10 py-2.5 focus:outline-none focus:border-blood-600 transition-colors" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-300">
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-blood-600 hover:bg-blood-700 text-white font-medium py-3 rounded transition-all shadow-[0_0_15px_rgba(153,27,27,0.3)]">
            ACESSAR SISTEMA
          </button>
        </form>
      </GlassCard>

      {/* SEÇÃO DE CADASTRO */}
      <GlassCard>
        <div className="text-center mb-8">
          <p className="text-blood-600 text-xs font-bold tracking-[0.2em] uppercase mb-2">Novo Detetive</p>
          <h2 className="text-3xl text-gray-100 font-serif tracking-wide">CADASTRO</h2>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 flex-grow">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Seu nome completo" 
              required
              value={registerData.nome}
              onChange={(e) => setRegisterData({...registerData, nome: e.target.value})}
              className="w-full bg-black/50 border border-dark-800 rounded text-gray-200 pl-10 pr-4 py-2.5 focus:outline-none focus:border-blood-600 transition-colors" 
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="email" 
              placeholder="seu@email.com" 
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              className="w-full bg-black/50 border border-dark-800 rounded text-gray-200 pl-10 pr-4 py-2.5 focus:outline-none focus:border-blood-600 transition-colors" 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="password" 
              placeholder="Crie uma senha" 
              required
              value={registerData.senha}
              onChange={(e) => setRegisterData({...registerData, senha: e.target.value})}
              className="w-full bg-black/50 border border-dark-800 rounded text-gray-200 pl-10 pr-10 py-2.5 focus:outline-none focus:border-blood-600 transition-colors" 
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="password" 
              placeholder="Confirme sua senha" 
              required
              value={registerData.confirmaSenha}
              onChange={(e) => setRegisterData({...registerData, confirmaSenha: e.target.value})}
              className="w-full bg-black/50 border border-dark-800 rounded text-gray-200 pl-10 pr-10 py-2.5 focus:outline-none focus:border-blood-600 transition-colors" 
            />
          </div>

          <button type="submit" className="w-full bg-blood-600 hover:bg-blood-700 text-white font-medium py-3 rounded transition-all shadow-[0_0_15px_rgba(153,27,27,0.3)] mt-4">
            CRIAR CONTA
          </button>
        </form>
      </GlassCard>
    </AuthLayout>
  );
}