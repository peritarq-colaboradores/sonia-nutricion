import { readSheet } from "./client";
import type { Medicion } from "@/types";

// Columnas de la hoja "Mediciones":
// A:id B:paciente_id C:fecha D:peso E:imc F:porcentaje_grasa
// G:masa_muscular H:agua_corporal I:grasa_visceral J:perimetro_cintura
// K:perimetro_cadera L:perimetro_abdomen M:masa_osea N:metabolismo_basal
// O:edad_metabolica P:masa_libre_grasa Q:observaciones R:created_at

export async function getMediciones(): Promise<Medicion[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("Mediciones");
    return rows.map(rowToMedicion);
  } catch (err) {
    console.error("[sheets/mediciones]", err);
    return null;
  }
}

const n = (v: string): number | undefined => v ? parseFloat(v) || undefined : undefined;

function rowToMedicion(r: string[]): Medicion {
  return {
    id:                r[0]  || "",
    paciente_id:       r[1]  || "",
    fecha:             r[2]  || "",
    peso:              n(r[3]),
    imc:               n(r[4]),
    porcentaje_grasa:  n(r[5]),
    masa_muscular:     n(r[6]),
    agua_corporal:     n(r[7]),
    grasa_visceral:    n(r[8]),
    perimetro_cintura: n(r[9]),
    perimetro_cadera:  n(r[10]),
    perimetro_abdomen: n(r[11]),
    masa_osea:         n(r[12]),
    metabolismo_basal: n(r[13]),
    edad_metabolica:   n(r[14]),
    masa_libre_grasa:  n(r[15]),
    observaciones:     r[16] || undefined,
    created_at:        r[17] || undefined,
  };
}

export function medicionToRow(m: Medicion): string[] {
  return [
    m.id, m.paciente_id, m.fecha,
    String(m.peso ?? ""), String(m.imc ?? ""),
    String(m.porcentaje_grasa ?? ""), String(m.masa_muscular ?? ""),
    String(m.agua_corporal ?? ""), String(m.grasa_visceral ?? ""),
    String(m.perimetro_cintura ?? ""), String(m.perimetro_cadera ?? ""),
    String(m.perimetro_abdomen ?? ""), String(m.masa_osea ?? ""),
    String(m.metabolismo_basal ?? ""), String(m.edad_metabolica ?? ""),
    String(m.masa_libre_grasa ?? ""),
    m.observaciones || "",
    m.created_at || new Date().toISOString(),
  ];
}
