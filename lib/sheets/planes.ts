import { readSheet } from "./client";
import type { PlanSemanal, PlanItem } from "@/types";

// ─── PLANES SEMANALES ─────────────────────────────────────────
// Columnas de la hoja "Planes":
// A:id B:paciente_id C:nombre D:fecha_inicio E:fecha_fin
// F:observaciones_generales G:kcal_objetivo H:activo I:created_at J:updated_at

export async function getPlanes(): Promise<PlanSemanal[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("Planes");
    return rows.map(rowToPlan);
  } catch (err) {
    console.error("[sheets/planes]", err);
    return null;
  }
}

function rowToPlan(r: string[]): PlanSemanal {
  return {
    id:                       r[0] || "",
    paciente_id:              r[1] || "",
    nombre:                   r[2] || "",
    fecha_inicio:             r[3] || undefined,
    fecha_fin:                r[4] || undefined,
    observaciones_generales:  r[5] || undefined,
    kcal_objetivo:            r[6] ? parseInt(r[6]) : undefined,
    activo:                   r[7] !== "FALSE",
    created_at:               r[8] || undefined,
    updated_at:               r[9] || undefined,
  };
}

export function planToRow(p: PlanSemanal): string[] {
  return [
    p.id, p.paciente_id, p.nombre,
    p.fecha_inicio || "", p.fecha_fin || "",
    p.observaciones_generales || "",
    String(p.kcal_objetivo ?? ""),
    p.activo ? "TRUE" : "FALSE",
    p.created_at || new Date().toISOString(),
    new Date().toISOString(),
  ];
}

// ─── PLAN ITEMS ───────────────────────────────────────────────
// Columnas de la hoja "PlanItems":
// A:id B:plan_id C:dia D:momento E:receta_id F:descripcion_libre G:observaciones H:orden

export async function getPlanItems(): Promise<PlanItem[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("PlanItems");
    return rows.map(rowToPlanItem);
  } catch (err) {
    console.error("[sheets/planItems]", err);
    return null;
  }
}

function rowToPlanItem(r: string[]): PlanItem {
  return {
    id:                r[0] || "",
    plan_id:           r[1] || "",
    dia:               (r[2] || "lunes") as PlanItem["dia"],
    momento:           (r[3] || "comida") as PlanItem["momento"],
    receta_id:         r[4] || undefined,
    descripcion_libre: r[5] || undefined,
    observaciones:     r[6] || undefined,
    orden:             r[7] ? parseInt(r[7]) : 0,
  };
}

export function planItemToRow(i: PlanItem): string[] {
  return [
    i.id, i.plan_id, i.dia, i.momento,
    i.receta_id || "", i.descripcion_libre || "",
    i.observaciones || "", String(i.orden ?? 0),
  ];
}
