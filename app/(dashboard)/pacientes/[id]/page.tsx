"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Printer, User, ClipboardList, Activity, Calendar, Wind, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card, { CardHeader } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { PageLoading } from "@/components/ui/LoadingSkeleton";
import ConsultaCard from "@/components/consultas/ConsultaCard";
import MedicionCard from "@/components/mediciones/MedicionCard";
import ConsultaModal from "@/components/consultas/ConsultaModal";
import MedicionModal from "@/components/mediciones/MedicionModal";
import { useApiData } from "@/lib/hooks/useApiData";
import {
  formatFecha, calcularEdad, getIniciales, clasificarIMC,
  NIVEL_ACTIVIDAD_LABEL,
} from "@/lib/utils";
import type { Paciente, BalanGastrico, Consulta, Medicion, PlanSemanal } from "@/types";

export default function FichaPacientePage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab]               = useState("resumen");
  const [showConsultaModal, setShowConsultaModal] = useState(false);
  const [showMedicionModal, setShowMedicionModal] = useState(false);

  const { data: pacientes,  loading: lP  } = useApiData<Paciente>("/api/pacientes");
  const { data: balones,    loading: lB  } = useApiData<BalanGastrico>("/api/pacientes?tipo=balon");
  const { data: consultas,  loading: lC, refetch: refetchC } = useApiData<Consulta>(`/api/consultas?paciente_id=${id}`);
  const { data: mediciones, loading: lM, refetch: refetchM } = useApiData<Medicion>(`/api/mediciones?paciente_id=${id}`);
  const { data: planes,     loading: lPl } = useApiData<PlanSemanal>(`/api/planes?paciente_id=${id}`);

  const loading = lP || lB;
  const paciente = pacientes.find((p) => p.id === id);
  const balon    = balones.find((b) => b.paciente_id === id);
  const planActivo = planes.find((p) => p.activo);

  if (loading) return <PageLoading />;

  if (!paciente) {
    return (
      <div className="p-6">
        <EmptyState
          icon={<User className="w-7 h-7" />}
          title="Paciente no encontrado"
          action={<Link href="/pacientes"><Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>Volver</Button></Link>}
        />
      </div>
    );
  }

  const edad     = calcularEdad(paciente.fecha_nacimiento);
  const iniciales = getIniciales(paciente.nombre, paciente.apellidos);

  const TABS = [
    { id: "resumen",    label: "Resumen",        icon: <User className="w-4 h-4" /> },
    { id: "clinico",    label: "Datos clínicos", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "consultas",  label: `Consultas (${consultas.length})`, icon: <ClipboardList className="w-4 h-4" /> },
    { id: "mediciones", label: `Mediciones (${mediciones.length})`, icon: <Activity className="w-4 h-4" /> },
    { id: "planes",     label: `Planes (${planes.length})`, icon: <Calendar className="w-4 h-4" /> },
    ...(paciente.tiene_balon_gastrico ? [{ id: "balon", label: "Balón gástrico", icon: <Wind className="w-4 h-4" /> }] : []),
  ];

  const ultimaMedicion   = mediciones[0];
  const medicionAnterior = mediciones[1];

  return (
    <div className="animate-fade-in">
      <Header
        title={`${paciente.nombre} ${paciente.apellidos}`}
        subtitle={`${edad} años · Alta: ${formatFecha(paciente.fecha_alta)}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => window.open(`/informes/${id}/print`, "_blank")}>
              Informe
            </Button>
            <Button variant="ghost" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>Editar</Button>
          </div>
        }
      />

      <div className="px-6 py-4">
        {/* Cabecera del paciente */}
        <div className="bg-white rounded-2xl border border-warm-100 shadow-card p-5 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-sage-600">{iniciales}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold text-warm-900">{paciente.nombre} {paciente.apellidos}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-warm-500">
                    <span>{edad} años</span>
                    {paciente.telefono && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{paciente.telefono}</span>}
                    {paciente.email    && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{paciente.email}</span>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {paciente.tiene_balon_gastrico && <Badge variant="terra">Balón gástrico</Badge>}
                  <Badge variant={paciente.activo ? "sage" : "warm"}>{paciente.activo ? "Activo" : "Inactivo"}</Badge>
                  <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowConsultaModal(true)}>
                    Nueva consulta
                  </Button>
                  <Button size="sm" variant="secondary" icon={<Activity className="w-3.5 h-3.5" />} onClick={() => setShowMedicionModal(true)}>
                    Medición
                  </Button>
                </div>
              </div>
              {paciente.objetivo_principal && (
                <div className="mt-3 text-sm text-warm-600 bg-warm-50 rounded-xl px-3 py-2">
                  <span className="font-medium text-warm-500">Objetivo: </span>{paciente.objetivo_principal}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="mb-5"><Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} /></div>

        <div className="animate-fade-in">
          {/* ─── RESUMEN ─────────────────────────────────── */}
          {activeTab === "resumen" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-sage-50 rounded-xl p-3.5 text-center">
                  <p className="text-2xl font-bold text-sage-700">{consultas.length}</p>
                  <p className="text-xs text-sage-500 mt-0.5">Consultas</p>
                </div>
                <div className="bg-terra-50 rounded-xl p-3.5 text-center">
                  <p className="text-2xl font-bold text-terra-700">{mediciones.length}</p>
                  <p className="text-xs text-terra-500 mt-0.5">Mediciones</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3.5 text-center">
                  <p className="text-2xl font-bold text-blue-700">{planes.length}</p>
                  <p className="text-xs text-blue-500 mt-0.5">Planes</p>
                </div>
              </div>

              {ultimaMedicion?.peso && (
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-warm-400 mb-0.5">Última medición — {formatFecha(ultimaMedicion.fecha)}</p>
                      <div className="flex items-baseline gap-4">
                        <span><span className="text-3xl font-bold text-warm-900">{ultimaMedicion.peso}</span><span className="text-warm-400 ml-1">kg</span></span>
                        {ultimaMedicion.imc && (
                          <span className={`text-lg font-semibold ${clasificarIMC(ultimaMedicion.imc).color}`}>
                            IMC {ultimaMedicion.imc} ({clasificarIMC(ultimaMedicion.imc).label})
                          </span>
                        )}
                      </div>
                    </div>
                    {ultimaMedicion.porcentaje_grasa && (
                      <div className="text-right">
                        <p className="text-xs text-warm-400">% Grasa</p>
                        <p className="text-xl font-bold text-warm-700">{ultimaMedicion.porcentaje_grasa}%</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {planActivo && (
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-warm-400 mb-0.5">Plan activo</p>
                      <p className="font-semibold text-warm-900">{planActivo.nombre}</p>
                      {planActivo.fecha_inicio && <p className="text-xs text-warm-400 mt-0.5">Desde {formatFecha(planActivo.fecha_inicio)}</p>}
                    </div>
                    <Link href={`/planes/${planActivo.id}`}>
                      <Button variant="ghost" size="sm">Ver plan</Button>
                    </Link>
                  </div>
                </Card>
              )}

              <Card>
                <CardHeader title="Resumen clínico" />
                <dl className="space-y-3">
                  {[
                    { label: "Objetivo", value: paciente.objetivo_principal },
                    { label: "Patologías", value: paciente.patologias },
                    { label: "Alergias", value: paciente.alergias },
                    { label: "Intolerancias", value: paciente.intolerancias },
                    { label: "Medicación", value: paciente.medicacion },
                    { label: "Actividad", value: NIVEL_ACTIVIDAD_LABEL[paciente.actividad_fisica || ""] },
                    { label: "Síntomas dig.", value: paciente.sintomas_digestivos },
                  ].map((row) =>
                    row.value ? (
                      <div key={row.label} className="flex gap-3">
                        <dt className="text-xs font-medium text-warm-500 w-36 flex-shrink-0 pt-0.5">{row.label}</dt>
                        <dd className="text-sm text-warm-800 flex-1">{row.value}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </Card>

              {paciente.notas_privadas && (
                <Card className="border-l-4 border-l-terra-400">
                  <p className="text-xs font-medium text-terra-600 mb-1">Nota privada</p>
                  <p className="text-sm text-warm-700">{paciente.notas_privadas}</p>
                </Card>
              )}
            </div>
          )}

          {/* ─── DATOS CLÍNICOS ──────────────────────────── */}
          {activeTab === "clinico" && (
            <Card>
              <CardHeader title="Datos clínicos completos"
                actions={<Button variant="ghost" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>Editar</Button>} />
              <dl className="space-y-4">
                {[
                  { label: "Objetivo principal", value: paciente.objetivo_principal },
                  { label: "Antecedentes", value: paciente.antecedentes },
                  { label: "Patologías", value: paciente.patologias },
                  { label: "Medicación", value: paciente.medicacion },
                  { label: "Alergias", value: paciente.alergias },
                  { label: "Intolerancias", value: paciente.intolerancias },
                  { label: "Preferencias", value: paciente.preferencias_alimentarias },
                  { label: "No le gustan", value: paciente.alimentos_no_gustan },
                  { label: "Actividad física", value: NIVEL_ACTIVIDAD_LABEL[paciente.actividad_fisica || ""] },
                  { label: "Horarios", value: paciente.horarios_habituales },
                  { label: "Ayuno", value: paciente.hace_ayuno ? `Sí${paciente.ventana_ayuno ? ` — ${paciente.ventana_ayuno}` : ""}` : "No" },
                  { label: "Síntomas digestivos", value: paciente.sintomas_digestivos },
                  { label: "Observaciones", value: paciente.observaciones_generales },
                ].map((c) => (
                  <div key={c.label} className="grid grid-cols-3 gap-3 py-2 border-b border-warm-50 last:border-0">
                    <dt className="text-xs font-medium text-warm-500 col-span-1">{c.label}</dt>
                    <dd className="text-sm text-warm-800 col-span-2">
                      {c.value || <span className="text-warm-300 italic">Sin registrar</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}

          {/* ─── CONSULTAS ───────────────────────────────── */}
          {activeTab === "consultas" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-warm-500">{consultas.length} consultas registradas</p>
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowConsultaModal(true)}>
                  Nueva consulta
                </Button>
              </div>
              {lC ? <div className="text-sm text-warm-400 py-4 text-center">Cargando...</div> :
                consultas.length > 0
                  ? consultas.map((c) => <ConsultaCard key={c.id} consulta={c} />)
                  : <EmptyState icon={<ClipboardList className="w-7 h-7" />} title="Sin consultas registradas"
                      action={<Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowConsultaModal(true)}>Primera consulta</Button>} />
              }
            </div>
          )}

          {/* ─── MEDICIONES ──────────────────────────────── */}
          {activeTab === "mediciones" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-warm-500">{mediciones.length} mediciones registradas</p>
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowMedicionModal(true)}>
                  Nueva medición
                </Button>
              </div>
              {lM ? <div className="text-sm text-warm-400 py-4 text-center">Cargando...</div> :
                mediciones.length > 0
                  ? mediciones.map((m, i) => <MedicionCard key={m.id} medicion={m} anterior={mediciones[i + 1]} />)
                  : <EmptyState icon={<Activity className="w-7 h-7" />} title="Sin mediciones registradas"
                      action={<Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowMedicionModal(true)}>Primera medición</Button>} />
              }
            </div>
          )}

          {/* ─── PLANES ──────────────────────────────────── */}
          {activeTab === "planes" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-warm-500">{planes.length} planes generados</p>
                <Link href={`/planes/nuevo?paciente=${id}`}>
                  <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Nuevo plan</Button>
                </Link>
              </div>
              {lPl ? <div className="text-sm text-warm-400 py-4 text-center">Cargando...</div> :
                planes.length > 0
                  ? planes.map((plan) => (
                      <Link key={plan.id} href={`/planes/${plan.id}`}>
                        <Card hover>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-warm-900 text-sm">{plan.nombre}</h4>
                                {plan.activo && <Badge variant="sage">Activo</Badge>}
                              </div>
                              <p className="text-xs text-warm-400">
                                {plan.fecha_inicio && formatFecha(plan.fecha_inicio)}
                                {plan.fecha_fin && ` → ${formatFecha(plan.fecha_fin)}`}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">Ver plan</Button>
                          </div>
                        </Card>
                      </Link>
                    ))
                  : <EmptyState icon={<Calendar className="w-7 h-7" />} title="Sin planes creados"
                      action={<Link href={`/planes/nuevo?paciente=${id}`}><Button icon={<Plus className="w-4 h-4" />}>Crear plan</Button></Link>} />
              }
            </div>
          )}

          {/* ─── BALÓN GÁSTRICO ──────────────────────────── */}
          {activeTab === "balon" && (
            balon ? (
              <Card>
                <CardHeader title="Seguimiento balón gástrico"
                  actions={<Button variant="ghost" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>Editar</Button>} />
                <dl className="space-y-3">
                  {[
                    { label: "Fase", value: balon.fase },
                    { label: "Colocación", value: balon.fecha_colocacion ? formatFecha(balon.fecha_colocacion) : undefined },
                    { label: "Tolerancia", value: balon.tolerancia_general },
                    { label: "Náuseas", value: balon.nauseas },
                    { label: "Vómitos", value: balon.vomitos },
                    { label: "Reflujo", value: balon.reflujo },
                    { label: "Saciedad", value: balon.saciedad },
                    { label: "Alimentos peor tol.", value: balon.alimentos_peor_tolerados },
                    { label: "Observaciones", value: balon.observaciones },
                  ].map((d) =>
                    d.value ? (
                      <div key={d.label} className="grid grid-cols-3 gap-3 py-2 border-b border-warm-50 last:border-0">
                        <dt className="text-xs font-medium text-warm-500">{d.label}</dt>
                        <dd className="text-sm text-warm-800 col-span-2 capitalize">{d.value}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </Card>
            ) : (
              <EmptyState icon={<Wind className="w-7 h-7" />} title="Sin datos de balón"
                action={<Button icon={<Plus className="w-4 h-4" />}>Registrar datos de balón</Button>} />
            )
          )}
        </div>
      </div>

      {showConsultaModal && (
        <ConsultaModal pacienteId={id} open={showConsultaModal}
          onClose={() => { setShowConsultaModal(false); refetchC(); }} />
      )}
      {showMedicionModal && (
        <MedicionModal pacienteId={id} open={showMedicionModal}
          onClose={() => { setShowMedicionModal(false); refetchM(); }} />
      )}
    </div>
  );
}
