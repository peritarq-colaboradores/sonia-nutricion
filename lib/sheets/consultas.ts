import { readSheet } from "./client";
import type { Consulta } from "@/types";

// Columnas de la hoja "Consultas":
// A:id B:paciente_id C:fecha D:motivo E:evolucion_anterior
// F:adherencia G:sintomas H:energia I:hambre_saciedad J:observaciones
// K:cambios_acordados L:notas_privadas M:conclusion N:plan_semanas_id O:created_at

export async function getConsultas(): Promise<Consulta[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("Consultas");
    return rows.map(rowToConsulta);
  } catch (err) {
    console.error("[sheets/consultas]", err);
    return null;
  }
}

function rowToConsulta(r: string[]): Consulta {
  return {
    id:                   r[0]  || "",
    paciente_id:          r[1]  || "",
    fecha:                r[2]  || "",
    motivo:               r[3]  || undefined,
    evolucion_anterior:   r[4]  || undefined,
    adherencia:           (r[5] || undefined) as Consulta["adherencia"],
    sintomas:             r[6]  || undefined,
    energia:              (r[7] || undefined) as Consulta["energia"],
    hambre_saciedad:      r[8]  || undefined,
    observaciones:        r[9]  || undefined,
    cambios_acordados:    r[10] || undefined,
    notas_privadas:       r[11] || undefined,
    conclusion:           r[12] || undefined,
    plan_semanas_id:      r[13] || undefined,
    created_at:           r[14] || undefined,
  };
}

export function consultaToRow(c: Consulta): string[] {
  return [
    c.id, c.paciente_id, c.fecha,
    c.motivo || "", c.evolucion_anterior || "",
    c.adherencia || "", c.sintomas || "",
    c.energia || "", c.hambre_saciedad || "",
    c.observaciones || "", c.cambios_acordados || "",
    c.notas_privadas || "", c.conclusion || "",
    c.plan_semanas_id || "",
    c.created_at || new Date().toISOString(),
  ];
}
