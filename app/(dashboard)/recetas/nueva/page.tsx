"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import Header from "@/components/layout/Header";
import Card, { CardHeader } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { ETIQUETAS_LABEL, cn } from "@/lib/utils";
import type { EtiquetaReceta, TipoComida } from "@/types";

const TIPO_OPTIONS = [
  { value: "desayuno", label: "Desayuno" },
  { value: "comida",   label: "Comida" },
  { value: "cena",     label: "Cena" },
  { value: "snack",    label: "Snack" },
  { value: "postre",   label: "Postre" },
  { value: "bebida",   label: "Bebida" },
];

const DIFICULTAD_OPTIONS = [
  { value: "facil",     label: "Fácil" },
  { value: "media",     label: "Media" },
  { value: "elaborada", label: "Elaborada" },
];

const TODAS_ETIQUETAS = Object.entries(ETIQUETAS_LABEL).map(([value, label]) => ({ value, label }));

export default function NuevaRecetaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    ingredientes: "",
    pasos: "",
    tipo_comida: "comida" as TipoComida,
    tiempo_estimado: "",
    dificultad: "facil",
    observaciones: "",
    compatibilidades: "",
  });
  const [etiquetas, setEtiquetas] = useState<EtiquetaReceta[]>([]);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleEtiqueta = (e: EtiquetaReceta) => {
    setEtiquetas((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    router.push("/recetas");
  };

  return (
    <div className="animate-fade-in">
      <Header
        title="Nueva receta"
        subtitle="Añade una receta a tu biblioteca"
        actions={
          <Link href="/recetas">
            <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>Volver</Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <div className="px-6 py-6 space-y-6 max-w-3xl">
          <Card>
            <CardHeader title="Información básica" icon={<BookOpen className="w-4 h-4" />} />
            <div className="space-y-4">
              <Input
                label="Nombre de la receta"
                value={form.titulo}
                onChange={(e) => update("titulo", e.target.value)}
                placeholder="Ej: Bowl de yogur con frutos rojos"
                required
              />
              <Textarea
                label="Descripción breve"
                value={form.descripcion}
                onChange={(e) => update("descripcion", e.target.value)}
                placeholder="Una frase que describa la receta..."
                rows={2}
              />
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Tipo de comida"
                  options={TIPO_OPTIONS}
                  value={form.tipo_comida}
                  onChange={(e) => update("tipo_comida", e.target.value)}
                />
                <Select
                  label="Dificultad"
                  options={DIFICULTAD_OPTIONS}
                  value={form.dificultad}
                  onChange={(e) => update("dificultad", e.target.value)}
                />
                <Input
                  label="Tiempo estimado (min)"
                  type="number"
                  value={form.tiempo_estimado}
                  onChange={(e) => update("tiempo_estimado", e.target.value)}
                  placeholder="15"
                />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Ingredientes y elaboración" />
            <div className="space-y-4">
              <Textarea
                label="Ingredientes"
                value={form.ingredientes}
                onChange={(e) => update("ingredientes", e.target.value)}
                placeholder={`- 200g yogur griego\n- 1 puñado de frutos rojos\n- 1 cdta de semillas de chía`}
                rows={6}
                hint="Un ingrediente por línea, comenzando con -"
              />
              <Textarea
                label="Elaboración (pasos)"
                value={form.pasos}
                onChange={(e) => update("pasos", e.target.value)}
                placeholder={`1. Verter el yogur en un bol.\n2. Añadir los frutos rojos.\n3. Espolvorear las semillas.`}
                rows={6}
                hint="Numera cada paso para facilitar la lectura"
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Etiquetas" />
            <div className="flex flex-wrap gap-2">
              {TODAS_ETIQUETAS.map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => toggleEtiqueta(value as EtiquetaReceta)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                    etiquetas.includes(value as EtiquetaReceta)
                      ? "bg-sage-500 text-white border-sage-500"
                      : "bg-white text-warm-600 border-warm-200 hover:border-sage-300"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Notas y compatibilidades" />
            <div className="space-y-4">
              <Textarea
                label="Observaciones"
                value={form.observaciones}
                onChange={(e) => update("observaciones", e.target.value)}
                placeholder="Notas sobre la receta, variaciones, etc."
                rows={2}
              />
              <Textarea
                label="Compatibilidades y usos recomendados"
                value={form.compatibilidades}
                onChange={(e) => update("compatibilidades", e.target.value)}
                placeholder="Ej: Ideal para balón gástrico fase blanda. No recomendada si hay intolerancia a la lactosa."
                rows={2}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pb-8">
            <Link href="/recetas">
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button type="submit" loading={loading} icon={<Save className="w-4 h-4" />}>
              Guardar receta
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
