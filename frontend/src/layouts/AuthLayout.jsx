import React from 'react';
import backgroundCrime from '../assets/background-crime.png';

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 font-sans overflow-hidden">
      {/* Imagem de Fundo (Mural de Evidências) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundCrime})` }}
      />
      
      {/* Overlay escuro para clima sombrio */}
      <div className="absolute inset-0 z-10 bg-black/70 backdrop-brightness-50" />

      {/* Container Principal */}
      <main className="relative z-20 w-full max-w-6xl flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {children}
      </main>
    </div>
  );
}