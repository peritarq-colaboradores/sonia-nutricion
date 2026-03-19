"use client";

import Link from "next/link";
import { Plus, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { PageLoading } from "@/components/ui/LoadingSkeleton";
import { useApiData } from "@/lib/hooks/useApiData";
import { formatFecha } from "@/lib/utils";
import type { Paciente, PlanSemanal } from "@/types";

export default function PlanesPage() {
  const { data: planes,    loading: lPl } = useApiData<PlanSemanal>("/api/planes");
  const { data: pacientes, loading: lP  } = useApiData<Paciente>("/api/pacientes");

  if (lPl || lP) return <PageLoading />;

  const activos    = planes.filter((p) => p.activo);
  const anteriores = planes.filter((p) => !p.activo);

  return (
    <div className="animate-fade-in">
      <Header
        title="Planes semanales"
        subtitle={`${activos.length} planes activos`}
        actions={<Link href="/planes/nuevo"><Button icon={<Plus className="w-4 h-4" />}>Nuevo plan</Button></Link>}
      />
      <div className="px-6 py-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-warm-700 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage-400 inline-block" />Planes activos
          </h3>
          {activos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activos.map((plan) => {
                const paciente = pacientes.find((p) => p.id === plan.paciente_id);
                return <PlanCard key={plan.id} plan={plan} paciente={paciente} />;
              })}
            </div>
          ) : (
            <EmptyState icon={<Calendar className="w-7 h-7" />} title="Sin planes activos" />
          )}
        </div>
        {anteriores.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-warm-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warm-300 inline-block" />Planes anteriores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {anteriores.map((plan) => {
                const paciente = pacientes.find((p) => p.id === plan.paciente_id);
                return <PlanCard key={plan.id} plan={plan} paciente={paciente} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanCard({ plan, paciente }: { plan: PlanSemanal; paciente?: Paciente }) {
  return (
    <Link href={`/planes/${plan.id}`}>
      <Card hover>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {plan.activo && <Badge variant="sage">Activo</Badge>}
              {paciente?.tiene_balon_gastrico && <Badge variant="terra">Balón</Badge>}
            </div>
            <h3 className="font-semibold text-warm-900 text-sm leading-snug">{plan.nombre}</h3>
          </div>
        </div>
        {paciente && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center">
              <span className="text-xs font-bold text-sage-600">
                {paciente.nombre.charAt(0)}{paciente.apellidos.charAt(0)}
              </span>
            </div>
            <span className="text-xs text-warm-600">{paciente.nombre} {paciente.apellidos}</span>
          </div>
        )}
        {plan.fecha_inicio && (
          <p className="text-xs text-warm-400">
            {formatFecha(plan.fecha_inicio)}{plan.fecha_fin && ` → ${formatFecha(plan.fecha_fin)}`}
          </p>
        )}
        {plan.kcal_objetivo && (
          <div className="mt-2">
            <span className="text-xs bg-warm-50 text-warm-600 px-2 py-0.5 rounded-full">~{plan.kcal_objetivo} kcal/día</span>
          </div>
        )}
      </Card>
    </Link>
  );
}
