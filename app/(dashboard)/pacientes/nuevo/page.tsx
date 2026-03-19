"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, User } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Card, { CardHeader } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { Paciente, NivelActividad, Sexo } from "@/types";

const SEXO_OPTIONS = [
  { value: "femenino", label: "Femenino" },
  { value: "masculino", label: "Masculino" },
  { value: "otro", label: "Otro / No especificado" },
];

const ACTIVIDAD_OPTIONS = [
  { value: "sedentario",  label: "Sedentario" },
  { value: "ligero",      label: "Ligero (1-2 días/semana)" },
  { value: "moderado",    label: "Moderado (3-4 días/semana)" },
  { value: "activo",      label: "Activo (5+ días/semana)" },
  { value: "muy_activo",  label: "Muy activo (intenso diario)" },
];

export default function NuevoPacientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    fecha_nacimiento: "",
    sexo: "femenino" as Sexo,
    telefono: "",
    email: "",
    objetivo_principal: "",
    antecedentes: "",
    patologias: "",
    medicacion: "",
    alergias: "",
    intolerancias: "",
    preferencias_alimentarias: "",
    alimentos_no_gustan: "",
    actividad_fisica: "moderado" as NivelActividad,
    horarios_habituales: "",
    hace_ayuno: false,
    ventana_ayuno: "",
    sintomas_digestivos: "",
    observaciones_generales: "",
    notas_privadas: "",
    tiene_balon_gastrico: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // En producción: guardar en Supabase
    await new Promise((r) => setTimeout(r, 600));
    // Mock: redirigir al listado
    router.push("/pacientes");
  };

  return (
    <div className="animate-fade-in">
      <Header
        title="Nuevo paciente"
        subtitle="Rellena los datos para crear la ficha del paciente"
        actions={
          <Link href="/pacientes">
            <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
              Volver
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <div className="px-6 py-6 space-y-6 max-w-4xl">

          {/* Datos personales */}
          <Card>
            <CardHeader
              title="Datos personales"
              icon={<User className="w-4 h-4" />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                placeholder="Nombre del paciente"
                required
              />
              <Input
                label="Apellidos"
                value={form.apellidos}
                onChange={(e) => update("apellidos", e.target.value)}
                placeholder="Apellidos"
                required
              />
              <Input
                label="Fecha de nacimiento"
                type="date"
                value={form.fecha_nacimiento}
                onChange={(e) => update("fecha_nacimiento", e.target.value)}
                required
              />
              <Select
                label="Sexo"
                options={SEXO_OPTIONS}
                value={form.sexo}
                onChange={(e) => update("sexo", e.target.value)}
              />
              <Input
                label="Teléfono"
                type="tel"
                value={form.telefono}
                onChange={(e) => update("telefono", e.target.value)}
                placeholder="600 000 000"
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="paciente@email.com"
              />
            </div>
          </Card>

          {/* Objetivo y antecedentes */}
          <Card>
            <CardHeader title="Objetivo y antecedentes clínicos" />
            <div className="space-y-4">
              <Input
                label="Objetivo principal"
                value={form.objetivo_principal}
                onChange={(e) => update("objetivo_principal", e.target.value)}
                placeholder="Ej: Pérdida de peso, mejorar composición corporal..."
              />
              <Textarea
                label="Antecedentes relevantes"
                value={form.antecedentes}
                onChange={(e) => update("antecedentes", e.target.value)}
                placeholder="Historial médico relevante..."
                rows={2}
              />
              <Textarea
                label="Patologías actuales"
                value={form.patologias}
                onChange={(e) => update("patologias", e.target.value)}
                placeholder="Diagnósticos activos..."
                rows={2}
              />
              <Textarea
                label="Medicación / Suplementación"
                value={form.medicacion}
                onChange={(e) => update("medicacion", e.target.value)}
                placeholder="Fármacos y suplementos actuales..."
                rows={2}
              />
            </div>
          </Card>

          {/* Alimentación */}
          <Card>
            <CardHeader title="Preferencias alimentarias" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Alergias"
                value={form.alergias}
                onChange={(e) => update("alergias", e.target.value)}
                placeholder="Alergias alimentarias conocidas..."
                rows={2}
              />
              <Textarea
                label="Intolerancias"
                value={form.intolerancias}
                onChange={(e) => update("intolerancias", e.target.value)}
                placeholder="Intolerancias diagnosticadas..."
                rows={2}
              />
              <Textarea
                label="Preferencias alimentarias"
                value={form.preferencias_alimentarias}
                onChange={(e) => update("preferencias_alimentarias", e.target.value)}
                placeholder="Lo que le gusta o prefiere comer..."
                rows={2}
              />
              <Textarea
                label="Alimentos que no le gustan"
                value={form.alimentos_no_gustan}
                onChange={(e) => update("alimentos_no_gustan", e.target.value)}
                placeholder="Alimentos que rechaza o evita..."
                rows={2}
              />
            </div>
          </Card>

          {/* Hábitos */}
          <Card>
            <CardHeader title="Hábitos y estilo de vida" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Nivel de actividad física"
                options={ACTIVIDAD_OPTIONS}
                value={form.actividad_fisica}
                onChange={(e) => update("actividad_fisica", e.target.value)}
              />
              <Input
                label="Horarios habituales"
                value={form.horarios_habituales}
                onChange={(e) => update("horarios_habituales", e.target.value)}
                placeholder="Ej: Come en casa a las 14h..."
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-warm-700">Ayuno intermitente</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hace_ayuno}
                      onChange={(e) => update("hace_ayuno", e.target.checked)}
                      className="w-4 h-4 rounded accent-sage-500"
                    />
                    <span className="text-sm text-warm-700">Realiza ayuno intermitente</span>
                  </label>
                </div>
                {form.hace_ayuno && (
                  <Input
                    placeholder="Ventana de ayuno (ej: 16/8)"
                    value={form.ventana_ayuno}
                    onChange={(e) => update("ventana_ayuno", e.target.value)}
                  />
                )}
              </div>
              <Textarea
                label="Síntomas digestivos"
                value={form.sintomas_digestivos}
                onChange={(e) => update("sintomas_digestivos", e.target.value)}
                placeholder="Hinchazón, reflujo, estreñimiento..."
                rows={2}
              />
            </div>
          </Card>

          {/* Balón gástrico */}
          <Card>
            <CardHeader title="Balón gástrico" />
            <div className="flex items-center gap-3 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.tiene_balon_gastrico}
                  onChange={(e) => update("tiene_balon_gastrico", e.target.checked)}
                  className="w-4 h-4 rounded accent-terra-500"
                />
                <span className="text-sm font-medium text-warm-700">
                  Este paciente tiene o ha tenido balón gástrico
                </span>
              </label>
            </div>
            {form.tiene_balon_gastrico && (
              <div className="bg-terra-50 border border-terra-100 rounded-xl p-4">
                <p className="text-sm text-terra-700">
                  El módulo de balón gástrico se configurará en la ficha del paciente
                  una vez creado.
                </p>
              </div>
            )}
          </Card>

          {/* Notas */}
          <Card>
            <CardHeader title="Observaciones y notas" />
            <div className="space-y-4">
              <Textarea
                label="Observaciones generales"
                value={form.observaciones_generales}
                onChange={(e) => update("observaciones_generales", e.target.value)}
                placeholder="Notas generales sobre el paciente..."
                rows={3}
              />
              <Textarea
                label="Notas privadas (solo tú las ves)"
                value={form.notas_privadas}
                onChange={(e) => update("notas_privadas", e.target.value)}
                placeholder="Notas personales sobre el paciente..."
                rows={3}
              />
            </div>
          </Card>

          {/* Botones */}
          <div className="flex items-center justify-end gap-3 pb-8">
            <Link href="/pacientes">
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button
              type="submit"
              loading={loading}
              icon={<Save className="w-4 h-4" />}
            >
              Crear paciente
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
