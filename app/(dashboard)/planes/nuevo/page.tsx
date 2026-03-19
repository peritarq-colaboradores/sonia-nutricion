"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, RefreshCw, Info } from "lucide-react";
import Header from "@/components/layout/Header";
import Card, { CardHeader } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PlannerGrid from "@/components/planes/PlannerGrid";
import { mockPacientes } from "@/lib/mock-data/pacientes";
import { mockRecetas } from "@/lib/mock-data/recetas";
import { generarPropuestaSemanal } from "@/lib/utils";
import type { DiaSemana, MomentoComida } from "@/types";

const DIAS: DiaSemana[] = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
const MOMENTOS: MomentoComida[] = ["desayuno","media_manana","comida","merienda","cena"];

export default function NuevoPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [propuestaGenerada, setPropuestaGenerada] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    paciente_id: "",
    fecha_inicio: "",
    fecha_fin: "",
    kcal_objetivo: "",
    observaciones_generales: "",
  });

  const [items, setItems] = useState<Record<string, { recetaId?: string; texto?: string }>>({});

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const pacienteOptions = mockPacientes.map((p) => ({
    value: p.id,
    label: `${p.nombre} ${p.apellidos}`,
  }));

  const pacienteSeleccionado = mockPacientes.find(p => p.id === form.paciente_id);

  // Genera la propuesta inicial basada en el perfil del paciente
  const handleGenerarPropuesta = async () => {
    if (!pacienteSeleccionado) return;
    setGenerando(true);
    // Pequeño delay para feedback visual
    await new Promise(r => setTimeout(r, 500));
    const propuesta = generarPropuestaSemanal(pacienteSeleccionado, mockRecetas);
    setItems(propuesta);
    setPropuestaGenerada(true);
    setGenerando(false);
    // Sugerir nombre automático si está vacío
    if (!form.nombre) {
      update("nombre", `Plan ${pacienteSeleccionado.nombre} — ${new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long" })}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    router.push("/planes");
  };

  return (
    <div className="animate-fade-in">
      <Header
        title="Nuevo plan semanal"
        subtitle="Diseña la pauta semanal para tu paciente"
        actions={
          <Link href="/planes">
            <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>Volver</Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <div className="px-6 py-6 space-y-6">
          {/* Configuración del plan */}
          <Card className="max-w-3xl">
            <CardHeader title="Configuración del plan" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre del plan"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                placeholder="Ej: Plan semana 1 — inicio"
                required
              />
              <Select
                label="Paciente"
                options={pacienteOptions}
                value={form.paciente_id}
                onChange={(e) => update("paciente_id", e.target.value)}
                placeholder="Selecciona un paciente"
                required
              />
              <Input
                label="Fecha inicio"
                type="date"
                value={form.fecha_inicio}
                onChange={(e) => update("fecha_inicio", e.target.value)}
              />
              <Input
                label="Fecha fin"
                type="date"
                value={form.fecha_fin}
                onChange={(e) => update("fecha_fin", e.target.value)}
              />
              <Input
                label="Objetivo calórico (kcal/día)"
                type="number"
                value={form.kcal_objetivo}
                onChange={(e) => update("kcal_objetivo", e.target.value)}
                placeholder="1500"
              />
            </div>
            <div className="mt-4">
              <Textarea
                label="Observaciones generales del plan"
                value={form.observaciones_generales}
                onChange={(e) => update("observaciones_generales", e.target.value)}
                placeholder="Notas sobre la pauta, indicaciones especiales..."
                rows={2}
              />
            </div>
          </Card>

          {/* Bloque generador de propuesta */}
          <Card>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm-900">Generar propuesta inicial</h3>
                  <p className="text-sm text-warm-500 mt-0.5 max-w-lg">
                    Crea una semana completa adaptada al perfil del paciente —
                    considerando alergias, intolerancias, preferencias y si tiene balón gástrico.
                    Después puedes ajustar cada celda a mano.
                  </p>
                  {pacienteSeleccionado && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pacienteSeleccionado.tiene_balon_gastrico && (
                        <span className="text-xs px-2 py-0.5 bg-terra-100 text-terra-700 rounded-full font-medium">
                          Balón gástrico — recetas suaves
                        </span>
                      )}
                      {(pacienteSeleccionado.alergias + pacienteSeleccionado.intolerancias).toLowerCase().includes("lactosa") && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                          Sin lácteos
                        </span>
                      )}
                      {(pacienteSeleccionado.alergias + pacienteSeleccionado.intolerancias).toLowerCase().includes("gluten") && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                          Sin gluten
                        </span>
                      )}
                      {pacienteSeleccionado.preferencias_alimentarias?.toLowerCase().includes("vegetarian") && (
                        <span className="text-xs px-2 py-0.5 bg-sage-100 text-sage-700 rounded-full font-medium">
                          Vegetariana
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 bg-warm-100 text-warm-600 rounded-full">
                        {pacienteSeleccionado.objetivo_principal}
                      </span>
                    </div>
                  )}
                  {!pacienteSeleccionado && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-warm-400">
                      <Info className="w-3.5 h-3.5" />
                      Selecciona un paciente para activar la propuesta
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {propuestaGenerada && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    icon={<RefreshCw className="w-3.5 h-3.5" />}
                    onClick={handleGenerarPropuesta}
                    loading={generando}
                  >
                    Regenerar
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={handleGenerarPropuesta}
                  disabled={!pacienteSeleccionado}
                  loading={generando}
                >
                  {propuestaGenerada ? "Propuesta generada ✓" : "Generar propuesta"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Planificador semanal */}
          <Card padding="none">
            <div className="px-6 py-5 border-b border-warm-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-warm-900">Planificador semanal</h3>
                <p className="text-xs text-warm-400 mt-0.5">
                  {propuestaGenerada
                    ? "Propuesta generada — haz clic en cualquier celda para ajustar a mano"
                    : "Haz clic en cada celda para asignar una receta o escribir una descripción libre"}
                </p>
              </div>
              {propuestaGenerada && (
                <span className="text-xs font-medium text-sage-600 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
                  {Object.keys(items).length} comidas asignadas
                </span>
              )}
            </div>
            <div className="p-4 overflow-x-auto">
              <PlannerGrid
                dias={DIAS}
                momentos={MOMENTOS}
                items={items}
                onUpdate={setItems}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pb-8">
            <Link href="/planes">
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button type="submit" loading={loading} icon={<Save className="w-4 h-4" />}>
              Guardar plan
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
