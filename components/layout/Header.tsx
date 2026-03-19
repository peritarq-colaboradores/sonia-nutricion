"use client";

import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pacientes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="no-print sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-warm-100 px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Título de página — pl-12 en móvil para no solapar con el hamburguesa */}
        <div className="min-w-0 flex-1 pl-10 md:pl-0">
          {title && (
            <div>
              <h1 className="text-xl font-semibold text-warm-900 truncate">{title}</h1>
              {subtitle && <p className="text-xs text-warm-400 mt-0.5">{subtitle}</p>}
            </div>
          )}
        </div>

        {/* Búsqueda rápida */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-300" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 pl-9 pr-4 py-2 bg-warm-50 border border-warm-200 rounded-xl text-sm
                         text-warm-700 placeholder-warm-300 focus:outline-none focus:ring-2
                         focus:ring-sage-300 focus:border-sage-400 transition-all duration-150
                         focus:w-72"
            />
          </div>
        </form>

        {/* Acciones y notificaciones */}
        <div className="flex items-center gap-2">
          {actions}
          <button className="w-9 h-9 rounded-xl bg-warm-50 border border-warm-200 flex items-center justify-center
                             text-warm-400 hover:text-warm-600 hover:bg-warm-100 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
