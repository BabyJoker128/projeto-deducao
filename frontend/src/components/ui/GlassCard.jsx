import React from 'react';

export default function GlassCard({ children }) {
  return (
    <div className="flex-1 w-full max-w-lg bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl flex flex-col transition-all duration-300 hover:border-red-900/50">
      {children}
    </div>
  );
}