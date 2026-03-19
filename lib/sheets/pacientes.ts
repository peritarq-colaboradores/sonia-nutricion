import { getSheetsClient, readSheet } from "./client";
import type { Paciente, BalanGastrico } from "@/types";

// ─── PACIENTES ────────────────────────────────────────────────
// Columnas de la hoja "Pacientes" (orden exacto):
// A:id B:nombre C:apellidos D:fecha_alta E:fecha_nacimiento F:sexo
// G:telefono H:email I:objetivo_principal J:antecedentes K:patologias
// L:medicacion M:alergias N:intolerancias O:preferencias_alimentarias
// P:alimentos_no_gustan Q:actividad_fisica R:horarios_habituales
// S:hace_ayuno T:ventana_ayuno U:sintomas_digestivos V:observaciones_generales
// W:notas_privadas X:tiene_balon_gastrico Y:activo Z:created_at AA:updated_at

export async function getPacientes(): Promise<Paciente[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("Pacientes");
    return rows.map(rowToPaciente);
  } catch (err) {
    console.error("[sheets/pacientes]", err);
    return null;
  }
}

function rowToPaciente(r: string[]): Paciente {
  return {
    id:                         r[0]  || "",
    nombre:                     r[1]  || "",
    apellidos:                  r[2]  || "",
    fecha_alta:                 r[3]  || "",
    fecha_nacimiento:           r[4]  || "",
    sexo:                       (r[5] || "otro") as Paciente["sexo"],
    telefono:                   r[6]  || undefined,
    email:                      r[7]  || undefined,
    objetivo_principal:         r[8]  || undefined,
    antecedentes:               r[9]  || undefined,
    patologias:                 r[10] || undefined,
    medicacion:                 r[11] || undefined,
    alergias:                   r[12] || undefined,
    intolerancias:              r[13] || undefined,
    preferencias_alimentarias:  r[14] || undefined,
    alimentos_no_gustan:        r[15] || undefined,
    actividad_fisica:           (r[16] || "moderado") as Paciente["actividad_fisica"],
    horarios_habituales:        r[17] || undefined,
    hace_ayuno:                 r[18] === "TRUE",
    ventana_ayuno:              r[19] || undefined,
    sintomas_digestivos:        r[20] || undefined,
    observaciones_generales:    r[21] || undefined,
    notas_privadas:             r[22] || undefined,
    tiene_balon_gastrico:       r[23] === "TRUE",
    activo:                     r[24] !== "FALSE", // por defecto activo
    created_at:                 r[25] || undefined,
    updated_at:                 r[26] || undefined,
  };
}

// Convierte un Paciente a array de valores para escribir en la hoja
export function pacienteToRow(p: Paciente): string[] {
  return [
    p.id, p.nombre, p.apellidos, p.fecha_alta, p.fecha_nacimiento,
    p.sexo || "otro",
    p.telefono || "", p.email || "",
    p.objetivo_principal || "", p.antecedentes || "",
    p.patologias || "", p.medicacion || "",
    p.alergias || "", p.intolerancias || "",
    p.preferencias_alimentarias || "", p.alimentos_no_gustan || "",
    p.actividad_fisica || "moderado", p.horarios_habituales || "",
    p.hace_ayuno ? "TRUE" : "FALSE",
    p.ventana_ayuno || "",
    p.sintomas_digestivos || "", p.observaciones_generales || "",
    p.notas_privadas || "",
    p.tiene_balon_gastrico ? "TRUE" : "FALSE",
    p.activo ? "TRUE" : "FALSE",
    p.created_at || new Date().toISOString(),
    new Date().toISOString(),
  ];
}

// ─── BALÓN GÁSTRICO ───────────────────────────────────────────
// Columnas de la hoja "BalonGastrico":
// A:id B:paciente_id C:fecha_colocacion D:fase E:tolerancia_general
// F:nauseas G:vomitos H:reflujo I:estrenimiento J:diarrea
// K:saciedad L:hambre_emocional M:alimentos_peor_tolerados N:observaciones O:updated_at

export async function getBalonGastrico(): Promise<BalanGastrico[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("BalonGastrico");
    return rows.map(rowToBalon);
  } catch (err) {
    console.error("[sheets/balon]", err);
    return null;
  }
}

function rowToBalon(r: string[]): BalanGastrico {
  return {
    id:                       r[0] || "",
    paciente_id:              r[1] || "",
    fecha_colocacion:         r[2] || undefined,
    fase:                     (r[3] || undefined) as BalanGastrico["fase"],
    tolerancia_general:       (r[4] || undefined) as BalanGastrico["tolerancia_general"],
    nauseas:                  (r[5] || undefined) as BalanGastrico["nauseas"],
    vomitos:                  (r[6] || undefined) as BalanGastrico["vomitos"],
    reflujo:                  (r[7] || undefined) as BalanGastrico["reflujo"],
    estrenimiento:            r[8] === "TRUE",
    diarrea:                  r[9] === "TRUE",
    saciedad:                 (r[10] || undefined) as BalanGastrico["saciedad"],
    hambre_emocional:         (r[11] || undefined) as BalanGastrico["hambre_emocional"],
    alimentos_peor_tolerados: r[12] || undefined,
    observaciones:            r[13] || undefined,
    updated_at:               r[14] || undefined,
  };
}
