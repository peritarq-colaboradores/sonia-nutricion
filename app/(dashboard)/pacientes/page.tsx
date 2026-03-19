"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import PatientCard from "@/components/pacientes/PatientCard";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { useApiData } from "@/lib/hooks/useApiData";
import { cn } from "@/lib/utils";
import type { Paciente } from "@/types";

type Filtro = "todos" | "activos" | "inactivos" | "balon";

export default function PacientesPage() {
  const { data: pacientes, loading } = useApiData<Paciente>("/api/pacientes");
  const [query, setQuery]   = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const pacientesFiltrados = useMemo(() => {
    let lista = pacientes;
    if (filtro === "activos")   lista = lista.filter((p) => p.activo);
    if (filtro === "inactivos") lista = lista.filter((p) => !p.activo);
    if (filtro === "balon")     lista = lista.filter((p) => p.tiene_balon_gastrico);
    if (query.trim()) {
      const q = query.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.apellidos.toLowerCase().includes(q) ||
          p.email?.toLowerCase().includes(q) ||
          p.telefono?.includes(q)
      );
    }
    return lista;
  }, [pacientes, query, filtro]);

  const FILTROS: { id: Filtro; label: string; count: number }[] = [
    { id: "todos",     label: "Todos",         count: pacientes.length },
    { id: "activos",   label: "Activos",        count: pacientes.filter((p) => p.activo).length },
    { id: "inactivos", label: "Inactivos",      count: pacientes.filter((p) => !p.activo).length },
    { id: "balon",     label: "Balón gástrico", count: pacientes.filter((p) => p.tiene_balon_gastrico).length },
  ];

  if (loading) return <PageLoading />;

  return (
    <div className="animate-fade-in">
      <Header
        title="Pacientes"
        subtitle={`${pacientes.filter((p) => p.activo).length} pacientes activos`}
        actions={
          <Link href="/pacientes/nuevo">
            <Button icon={<Plus className="w-4 h-4" />}>Nuevo paciente</Button>
          </Link>
        }
      />

      <div className="px-6 py-6 space-y-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-warm-200 rounded-xl text-sm
                       text-warm-900 placeholder-warm-400 focus:outline-none focus:ring-2
                       focus:ring-sage-300 focus:border-sage-400 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                filtro === f.id
                  ? "bg-sage-500 text-white shadow-sm"
                  : "bg-white text-warm-600 border border-warm-200 hover:bg-warm-50"
              )}
            >
              {f.label}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                filtro === f.id ? "bg-white/20 text-white" : "bg-warm-100 text-warm-500"
              )}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {pacientesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pacientesFiltrados.map((p) => (
              <PatientCard key={p.id} paciente={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="w-7 h-7" />}
            title="No se encontraron pacientes"
            description={query ? `Sin resultados para "${query}".` : "Aún no tienes pacientes registrados."}
            action={
              !query ? (
                <Link href="/pacientes/nuevo">
                  <Button icon={<Plus className="w-4 h-4" />}>Añadir primer paciente</Button>
                </Link>
              ) : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
