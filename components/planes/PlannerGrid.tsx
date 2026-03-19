"use client";

import { useState } from "react";
import { Plus, X, BookOpen } from "lucide-react";
import { cn, DIAS_SEMANA_LABEL, MOMENTO_LABEL } from "@/lib/utils";
import { mockRecetas } from "@/lib/mock-data/recetas";
import type { DiaSemana, MomentoComida } from "@/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type CeldaKey = string; // "lunes-desayuno"
type ItemsMap = Record<CeldaKey, { recetaId?: string; texto?: string }>;

interface PlannerGridProps {
  dias: DiaSemana[];
  momentos: MomentoComida[];
  items: ItemsMap;
  onUpdate: (items: ItemsMap) => void;
  readonly?: boolean;
}

const MOMENTO_COLORS: Record<MomentoComida, string> = {
  desayuno:    "bg-yellow-50 border-yellow-200 text-yellow-800",
  media_manana:"bg-orange-50 border-orange-200 text-orange-800",
  comida:      "bg-sage-50 border-sage-200 text-sage-800",
  merienda:    "bg-terra-50 border-terra-200 text-terra-800",
  cena:        "bg-blue-50 border-blue-200 text-blue-800",
};

export default function PlannerGrid({
  dias,
  momentos,
  items,
  onUpdate,
  readonly = false,
}: PlannerGridProps) {
  const [editKey, setEditKey] = useState<CeldaKey | null>(null);
  const [editText, setEditText] = useState("");
  const [editRecetaId, setEditRecetaId] = useState("");
  const [recetaQuery, setRecetaQuery] = useState("");

  const getKey = (dia: DiaSemana, momento: MomentoComida) => `${dia}-${momento}`;

  const openEdit = (dia: DiaSemana, momento: MomentoComida) => {
    if (readonly) return;
    const key = getKey(dia, momento);
    const existing = items[key];
    setEditKey(key);
    setEditText(existing?.texto || "");
    setEditRecetaId(existing?.recetaId || "");
    setRecetaQuery("");
  };

  const saveEdit = () => {
    if (!editKey) return;
    const updated = { ...items };
    if (!editText && !editRecetaId) {
      delete updated[editKey];
    } else {
      updated[editKey] = {
        ...(editRecetaId ? { recetaId: editRecetaId } : {}),
        ...(editText ? { texto: editText } : {}),
      };
    }
    onUpdate(updated);
    setEditKey(null);
  };

  const clearCelda = (dia: DiaSemana, momento: MomentoComida) => {
    const key = getKey(dia, momento);
    const updated = { ...items };
    delete updated[key];
    onUpdate(updated);
  };

  const recetasFiltradas = mockRecetas.filter((r) =>
    !recetaQuery || r.titulo.toLowerCase().includes(recetaQuery.toLowerCase())
  );

  const recetaSeleccionada = editRecetaId ? mockRecetas.find((r) => r.id === editRecetaId) : null;

  return (
    <>
      <div className="min-w-[900px]">
        {/* Cabecera de días */}
        <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `120px repeat(${dias.length}, 1fr)` }}>
          <div /> {/* columna de momentos */}
          {dias.map((dia) => (
            <div key={dia} className="text-center text-xs font-semibold text-warm-600 py-2">
              {DIAS_SEMANA_LABEL[dia]}
            </div>
          ))}
        </div>

        {/* Filas por momento */}
        {momentos.map((momento) => (
          <div
            key={momento}
            className="grid gap-1 mb-1"
            style={{ gridTemplateColumns: `120px repeat(${dias.length}, 1fr)` }}
          >
            {/* Etiqueta del momento */}
            <div className={cn(
              "flex items-center px-2 py-2 rounded-lg text-xs font-semibold border",
              MOMENTO_COLORS[momento]
            )}>
              {MOMENTO_LABEL[momento]}
            </div>

            {/* Celdas */}
            {dias.map((dia) => {
              const key = getKey(dia, momento);
              const item = items[key];
              const receta = item?.recetaId ? mockRecetas.find((r) => r.id === item.recetaId) : null;
              const contenido = receta?.titulo || item?.texto;

              return (
                <div
                  key={key}
                  onClick={() => openEdit(dia, momento)}
                  className={cn(
                    "min-h-[60px] rounded-lg border-2 border-dashed p-2 cursor-pointer transition-all group relative",
                    contenido
                      ? "border-warm-200 bg-white hover:border-sage-300"
                      : "border-warm-100 bg-warm-50/50 hover:border-sage-200 hover:bg-sage-50/30"
                  )}
                >
                  {contenido ? (
                    <div className="h-full">
                      <p className="text-xs font-medium text-warm-800 leading-tight line-clamp-3">
                        {contenido}
                      </p>
                      {receta && (
                        <BookOpen className="w-2.5 h-2.5 text-sage-400 mt-1" />
                      )}
                      {!readonly && (
                        <button
                          onClick={(e) => { e.stopPropagation(); clearCelda(dia, momento); }}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity
                                     w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    !readonly && (
                      <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-4 h-4 text-sage-400" />
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Modal de edición de celda */}
      {editKey && (
        <Modal
          open={!!editKey}
          onClose={() => setEditKey(null)}
          title="Asignar comida"
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setEditKey(null)}>Cancelar</Button>
              <Button onClick={saveEdit}>Guardar</Button>
            </>
          }
        >
          <div className="space-y-4">
            {/* Buscador de recetas */}
            <div>
              <p className="text-sm font-medium text-warm-700 mb-2">Seleccionar receta de la biblioteca</p>
              <Input
                placeholder="Buscar receta..."
                value={recetaQuery}
                onChange={(e) => setRecetaQuery(e.target.value)}
              />
              <div className="mt-2 max-h-48 overflow-y-auto space-y-1 rounded-xl border border-warm-100 p-2">
                <button
                  type="button"
                  onClick={() => setEditRecetaId("")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors",
                    !editRecetaId ? "bg-sage-50 text-sage-700 font-medium" : "hover:bg-warm-50 text-warm-600"
                  )}
                >
                  Sin receta vinculada
                </button>
                {recetasFiltradas.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => { setEditRecetaId(r.id); setEditText(""); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors",
                      editRecetaId === r.id ? "bg-sage-50 text-sage-700 font-medium" : "hover:bg-warm-50 text-warm-600"
                    )}
                  >
                    <span className="font-medium">{r.titulo}</span>
                    <span className="text-warm-400 ml-1">({MOMENTO_LABEL[r.tipo_comida as MomentoComida] || r.tipo_comida})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* O descripción libre */}
            {!editRecetaId && (
              <div>
                <p className="text-sm font-medium text-warm-700 mb-2">O escribe una descripción libre</p>
                <Input
                  placeholder="Ej: Fruta de temporada + 20g frutos secos"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}

            {recetaSeleccionada && (
              <div className="bg-sage-50 rounded-xl p-3">
                <p className="text-xs font-medium text-sage-700 mb-1">{recetaSeleccionada.titulo}</p>
                <p className="text-xs text-sage-600">{recetaSeleccionada.descripcion}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
