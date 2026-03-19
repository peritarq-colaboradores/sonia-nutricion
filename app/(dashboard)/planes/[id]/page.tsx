"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Edit, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Card, { CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import PlannerGrid from "@/components/planes/PlannerGrid";
import { mockPlanes, mockPlanItems } from "@/lib/mock-data/planes";
import { mockPacientes } from "@/lib/mock-data/pacientes";
import { mockRecetas } from "@/lib/mock-data/recetas";
import { formatFecha, DIAS_SEMANA_LABEL, MOMENTO_LABEL } from "@/lib/utils";
import type { DiaSemana, MomentoComida } from "@/types";

const DIAS: DiaSemana[] = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
const MOMENTOS: MomentoComida[] = ["desayuno","media_manana","comida","merienda","cena"];

export default function PlanPage() {
  const params = useParams();
  const id = params.id as string;

  const plan = mockPlanes.find((p) => p.id === id);
  if (!plan) {
    return (
      <div className="p-6">
        <EmptyState
          icon={<Users className="w-7 h-7" />}
          title="Plan no encontrado"
          action={<Link href="/planes"><Button variant="secondary">Volver a planes</Button></Link>}
        />
      </div>
    );
  }

  const paciente = mockPacientes.find((p) => p.id === plan.paciente_id);
  const planItems = mockPlanItems.filter((i) => i.plan_id === id);

  // Construir el mapa de items para el PlannerGrid (readonly)
  const itemsMap: Record<string, { recetaId?: string; texto?: string }> = {};
  planItems.forEach((item) => {
    const key = `${item.dia}-${item.momento}`;
    const receta = item.receta_id ? mockRecetas.find((r) => r.id === item.receta_id) : undefined;
    itemsMap[key] = {
      ...(item.receta_id ? { recetaId: item.receta_id } : {}),
      ...(item.descripcion_libre ? { texto: item.descripcion_libre } : {}),
    };
  });

  return (
    <div className="animate-fade-in">
      <Header
        title={plan.nombre}
        subtitle={paciente ? `${paciente.nombre} ${paciente.apellidos}` : ""}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => window.open(`/informes/${plan.paciente_id}/print?plan=${id}`, "_blank")}
            >
              Imprimir plan
            </Button>
            <Button variant="ghost" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>
              Editar
            </Button>
            <Link href="/planes">
              <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Volver
              </Button>
            </Link>
          </div>
        }
      />

      <div className="px-6 py-6 space-y-5">
        {/* Info del plan */}
        <Card>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {plan.activo && <Badge variant="sage">Plan activo</Badge>}
                {paciente?.tiene_balon_gastrico && <Badge variant="terra">Balón gástrico</Badge>}
              </div>
              <h2 className="text-lg font-semibold text-warm-900 mb-1">{plan.nombre}</h2>
              {paciente && (
                <p className="text-sm text-warm-500">
                  Paciente: <strong className="text-warm-700">{paciente.nombre} {paciente.apellidos}</strong>
                </p>
              )}
              {plan.fecha_inicio && (
                <p className="text-xs text-warm-400 mt-1">
                  {formatFecha(plan.fecha_inicio)}
                  {plan.fecha_fin && ` — ${formatFecha(plan.fecha_fin)}`}
                </p>
              )}
              {plan.observaciones_generales && (
                <p className="text-sm text-warm-600 mt-3 bg-warm-50 rounded-xl px-3 py-2">
                  {plan.observaciones_generales}
                </p>
              )}
            </div>
            {plan.kcal_objetivo && (
              <div className="text-center bg-sage-50 rounded-xl px-5 py-3">
                <p className="text-2xl font-bold text-sage-700">{plan.kcal_objetivo}</p>
                <p className="text-xs text-sage-500">kcal/día objetivo</p>
              </div>
            )}
          </div>
        </Card>

        {/* Planificador semanal (solo lectura) */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-warm-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-warm-900">Distribución semanal</h3>
              <p className="text-xs text-warm-400 mt-0.5">{planItems.length} comidas asignadas</p>
            </div>
            <Button
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => window.open(`/informes/${plan.paciente_id}/print?plan=${id}`, "_blank")}
            >
              Imprimir
            </Button>
          </div>
          <div className="p-4 overflow-x-auto">
            <PlannerGrid
              dias={DIAS}
              momentos={MOMENTOS}
              items={itemsMap}
              onUpdate={() => {}}
              readonly
            />
          </div>
        </Card>

        {/* Lista detallada de comidas */}
        <Card>
          <CardHeader title="Detalle de comidas" />
          <div className="space-y-4">
            {DIAS.map((dia) => {
              const comidasDia = planItems.filter((i) => i.dia === dia);
              if (comidasDia.length === 0) return null;
              return (
                <div key={dia}>
                  <h4 className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-2">
                    {DIAS_SEMANA_LABEL[dia]}
                  </h4>
                  <div className="space-y-1.5">
                    {MOMENTOS.map((momento) => {
                      const item = comidasDia.find((i) => i.momento === momento);
                      if (!item) return null;
                      const receta = item.receta_id ? mockRecetas.find((r) => r.id === item.receta_id) : null;
                      return (
                        <div key={momento} className="flex items-start gap-3 py-1.5">
                          <span className="text-xs text-warm-400 w-24 flex-shrink-0 font-medium pt-0.5">
                            {MOMENTO_LABEL[momento]}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-warm-800">
                              {receta?.titulo || item.descripcion_libre || "—"}
                            </p>
                            {item.observaciones && (
                              <p className="text-xs text-warm-400 mt-0.5">{item.observaciones}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-b border-warm-50 mt-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
