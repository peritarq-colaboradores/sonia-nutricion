"use client";

import Link from "next/link";
import { Users, ClipboardList, Activity, Calendar, ArrowRight, Leaf, BookOpen } from "lucide-react";
import Header from "@/components/layout/Header";
import Card, { CardHeader } from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import PatientCard from "@/components/pacientes/PatientCard";
import ConsultaCard from "@/components/consultas/ConsultaCard";
import Button from "@/components/ui/Button";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { useApiData } from "@/lib/hooks/useApiData";
import { formatFecha } from "@/lib/utils";
import type { Paciente, Consulta, PlanSemanal } from "@/types";

export default function DashboardPage() {
  const { data: pacientes, loading: loadP } = useApiData<Paciente>("/api/pacientes");
  const { data: consultas, loading: loadC } = useApiData<Consulta>("/api/consultas");
  const { data: planes,    loading: loadPl } = useApiData<PlanSemanal>("/api/planes");

  const loading = loadP || loadC || loadPl;

  const pacientesRecientes = pacientes.slice(0, 3);
  const consultasRecientes = [...consultas]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 4);
  const planesActivos = planes.filter((p) => p.activo);

  const hoy = new Date();
  const greeting = hoy.getHours() < 13 ? "Buenos días" : hoy.getHours() < 20 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="animate-fade-in">
      <Header
        title={`${greeting}, Sonia`}
        subtitle={formatFecha(hoy.toISOString(), "EEEE, d MMMM yyyy")}
      />

      <div className="px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pacientes activos" value={loading ? "…" : pacientes.filter((p) => p.activo).length}
            sublabel="En seguimiento" icon={<Users className="w-4 h-4" />} color="sage" />
          <StatCard label="Total consultas" value={loading ? "…" : consultas.length}
            sublabel="Registradas" icon={<ClipboardList className="w-4 h-4" />} color="terra" />
          <StatCard label="Planes activos" value={loading ? "…" : planesActivos.length}
            sublabel="En curso" icon={<Calendar className="w-4 h-4" />} color="blue" />
          <StatCard label="Balón gástrico" value={loading ? "…" : pacientes.filter((p) => p.tiene_balon_gastrico).length}
            sublabel="Pacientes con balón" icon={<Activity className="w-4 h-4" />} color="warm" />
        </div>

        {/* Acciones rápidas */}
        <Card>
          <CardHeader title="Acceso rápido" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/pacientes/nuevo", icon: <Users className="w-5 h-5 text-white" />, bg: "bg-sage-500", label: "Nuevo paciente", color: "sage" },
              { href: "/pacientes",       icon: <ClipboardList className="w-5 h-5 text-warm-700" />, bg: "bg-warm-200", label: "Nueva consulta", color: "warm" },
              { href: "/recetas/nueva",   icon: <BookOpen className="w-5 h-5 text-white" />, bg: "bg-terra-400", label: "Nueva receta", color: "terra" },
              { href: "/planes/nuevo",    icon: <Calendar className="w-5 h-5 text-white" />, bg: "bg-blue-400", label: "Nuevo plan", color: "blue" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-${item.color}-50
                                 hover:bg-${item.color}-100 transition-colors cursor-pointer text-center`}>
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm font-medium text-${item.color}-700`}>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pacientes recientes */}
          <Card padding="none">
            <div className="px-6 pt-5 pb-4 border-b border-warm-50 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-warm-900">Pacientes recientes</h3>
                <p className="text-xs text-warm-400 mt-0.5">Últimas fichas registradas</p>
              </div>
              <Link href="/pacientes">
                <Button variant="ghost" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>Ver todos</Button>
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {loading ? [1,2,3].map((i) => <CardSkeleton key={i} />) :
                pacientesRecientes.map((p) => <PatientCard key={p.id} paciente={p} />)
              }
            </div>
          </Card>

          {/* Últimas consultas */}
          <Card padding="none">
            <div className="px-6 pt-5 pb-4 border-b border-warm-50">
              <h3 className="font-semibold text-warm-900">Últimas consultas</h3>
              <p className="text-xs text-warm-400 mt-0.5">Actividad reciente</p>
            </div>
            <div className="p-4 space-y-2">
              {loading ? [1,2,3].map((i) => <CardSkeleton key={i} />) :
                consultasRecientes.map((c) => {
                  const paciente = pacientes.find((p) => p.id === c.paciente_id);
                  return (
                    <div key={c.id}>
                      {paciente && (
                        <p className="text-xs font-medium text-warm-400 px-1 mb-1">
                          {paciente.nombre} {paciente.apellidos}
                        </p>
                      )}
                      <ConsultaCard consulta={c} />
                    </div>
                  );
                })
              }
            </div>
          </Card>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-sage-500 to-sage-600 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Planes activos en este momento</p>
              <p className="text-sage-100 text-xs mt-0.5">
                {planesActivos.length} plan{planesActivos.length !== 1 ? "es" : ""} activo{planesActivos.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link href="/planes">
            <Button variant="secondary" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Ver planes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
