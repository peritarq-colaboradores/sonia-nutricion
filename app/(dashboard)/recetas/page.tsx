"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, BookOpen, Clock, ChefHat } from "lucide-react";
import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { useApiData } from "@/lib/hooks/useApiData";
import { ETIQUETAS_LABEL, TIPO_COMIDA_LABEL, cn } from "@/lib/utils";
import type { Receta, EtiquetaReceta, TipoComida } from "@/types";

const TIPOS = [
  { id: "todos",    label: "Todas" },
  { id: "desayuno", label: "Desayuno" },
  { id: "comida",   label: "Comida" },
  { id: "cena",     label: "Cena" },
  { id: "snack",    label: "Snack" },
];

const ETIQUETAS_POPULARES: EtiquetaReceta[] = [
  "alta_proteina", "saciante", "apta_balon", "sin_gluten", "vegetariana", "batch_cooking",
];

export default function RecetasPage() {
  const { data: recetas, loading } = useApiData<Receta>("/api/recetas");
  const [query, setQuery]           = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [etiquetasFiltro, setEtiquetasFiltro] = useState<EtiquetaReceta[]>([]);

  const toggleEtiqueta = (e: EtiquetaReceta) =>
    setEtiquetasFiltro((prev) => prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]);

  const recetasFiltradas = useMemo(() => {
    let lista = recetas;
    if (tipoFiltro !== "todos") lista = lista.filter((r) => r.tipo_comida === tipoFiltro as TipoComida);
    if (etiquetasFiltro.length > 0)
      lista = lista.filter((r) => etiquetasFiltro.every((e) => r.etiquetas?.includes(e)));
    if (query.trim()) {
      const q = query.toLowerCase();
      lista = lista.filter((r) =>
        r.titulo.toLowerCase().includes(q) || r.descripcion?.toLowerCase().includes(q) || r.ingredientes.toLowerCase().includes(q)
      );
    }
    return lista;
  }, [recetas, query, tipoFiltro, etiquetasFiltro]);

  if (loading) return <PageLoading />;

  return (
    <div className="animate-fade-in">
      <Header
        title="Biblioteca de recetas"
        subtitle={`${recetas.length} recetas guardadas`}
        actions={<Link href="/recetas/nueva"><Button icon={<Plus className="w-4 h-4" />}>Nueva receta</Button></Link>}
      />
      <div className="px-6 py-6 space-y-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <input type="text" placeholder="Buscar por nombre o ingrediente..." value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-warm-200 rounded-xl text-sm text-warm-900 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-colors" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {TIPOS.map((t) => (
            <button key={t.id} onClick={() => setTipoFiltro(t.id)}
              className={cn("px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                tipoFiltro === t.id ? "bg-sage-500 text-white shadow-sm" : "bg-white text-warm-600 border border-warm-200 hover:bg-warm-50"
              )}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-warm-400 self-center mr-1">Filtrar por:</span>
          {ETIQUETAS_POPULARES.map((e) => (
            <button key={e} onClick={() => toggleEtiqueta(e)}
              className={cn("px-2.5 py-1 rounded-full text-xs font-medium transition-all border",
                etiquetasFiltro.includes(e) ? "bg-sage-500 text-white border-sage-500" : "bg-white text-warm-500 border-warm-200 hover:border-sage-300"
              )}>
              {ETIQUETAS_LABEL[e]}
            </button>
          ))}
          {etiquetasFiltro.length > 0 && (
            <button onClick={() => setEtiquetasFiltro([])} className="px-2.5 py-1 rounded-full text-xs text-red-500 border border-red-200 hover:bg-red-50">
              Limpiar
            </button>
          )}
        </div>

        {recetasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recetasFiltradas.map((r) => <RecetaCard key={r.id} receta={r} />)}
          </div>
        ) : (
          <EmptyState icon={<BookOpen className="w-7 h-7" />} title="No se encontraron recetas"
            action={<Link href="/recetas/nueva"><Button icon={<Plus className="w-4 h-4" />}>Añadir receta</Button></Link>} />
        )}
      </div>
    </div>
  );
}

function RecetaCard({ receta }: { receta: Receta }) {
  const [expanded, setExpanded] = useState(false);
  const DIFICULTAD_COLOR: Record<string, string> = {
    facil: "bg-sage-100 text-sage-700", media: "bg-yellow-50 text-yellow-700", elaborada: "bg-terra-100 text-terra-700",
  };
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
              receta.tipo_comida === "desayuno" ? "bg-yellow-50 text-yellow-700" :
              receta.tipo_comida === "comida" ? "bg-sage-50 text-sage-700" :
              receta.tipo_comida === "cena" ? "bg-blue-50 text-blue-700" : "bg-warm-100 text-warm-600"
            )}>
              {TIPO_COMIDA_LABEL[receta.tipo_comida]}
            </span>
            {receta.dificultad && (
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", DIFICULTAD_COLOR[receta.dificultad])}>
                {receta.dificultad === "facil" ? "Fácil" : receta.dificultad === "media" ? "Media" : "Elaborada"}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-warm-900 text-sm leading-snug">{receta.titulo}</h3>
        </div>
        {receta.tiempo_estimado && (
          <div className="flex items-center gap-1 text-xs text-warm-400 flex-shrink-0">
            <Clock className="w-3 h-3" /><span>{receta.tiempo_estimado}min</span>
          </div>
        )}
      </div>
      {receta.descripcion && <p className="text-xs text-warm-500 leading-relaxed">{receta.descripcion}</p>}
      {receta.etiquetas && receta.etiquetas.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {receta.etiquetas.slice(0, 4).map((e) => (
            <span key={e} className="text-xs bg-warm-50 text-warm-500 px-2 py-0.5 rounded-full border border-warm-100">
              {ETIQUETAS_LABEL[e]}
            </span>
          ))}
          {receta.etiquetas.length > 4 && <span className="text-xs text-warm-400">+{receta.etiquetas.length - 4}</span>}
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)}
        className="text-xs text-sage-600 hover:text-sage-700 font-medium flex items-center gap-1 transition-colors">
        <ChefHat className="w-3.5 h-3.5" />
        {expanded ? "Ocultar ingredientes" : "Ver ingredientes"}
      </button>
      {expanded && (
        <div className="bg-warm-50 rounded-xl p-3 text-xs text-warm-700 whitespace-pre-line leading-relaxed border border-warm-100">
          {receta.ingredientes}
        </div>
      )}
      {receta.compatibilidades && (
        <p className="text-xs text-terra-600 bg-terra-50 rounded-lg px-2.5 py-1.5 leading-snug">{receta.compatibilidades}</p>
      )}
    </Card>
  );
}
