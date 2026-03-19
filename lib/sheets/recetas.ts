import { readSheet } from "./client";
import type { Receta, EtiquetaReceta } from "@/types";

// Columnas de la hoja "Recetas":
// A:id B:titulo C:descripcion D:ingredientes E:pasos F:tipo_comida
// G:tiempo_estimado H:dificultad I:etiquetas(coma-separadas)
// J:observaciones K:compatibilidades L:imagen_url M:created_at N:updated_at

export async function getRecetas(): Promise<Receta[] | null> {
  if (!process.env.GOOGLE_SHEETS_ID) return null;
  try {
    const rows = await readSheet("Recetas");
    return rows.map(rowToReceta);
  } catch (err) {
    console.error("[sheets/recetas]", err);
    return null;
  }
}

function rowToReceta(r: string[]): Receta {
  return {
    id:              r[0]  || "",
    titulo:          r[1]  || "",
    descripcion:     r[2]  || undefined,
    ingredientes:    r[3]  || "",
    pasos:           r[4]  || undefined,
    tipo_comida:     (r[5] || "comida") as Receta["tipo_comida"],
    tiempo_estimado: r[6] ? parseInt(r[6]) : undefined,
    dificultad:      (r[7] || "facil") as Receta["dificultad"],
    // etiquetas almacenadas como cadena separada por comas
    etiquetas: r[8]
      ? (r[8].split(",").map((e) => e.trim()).filter(Boolean) as EtiquetaReceta[])
      : [],
    observaciones:    r[9]  || undefined,
    compatibilidades: r[10] || undefined,
    imagen_url:       r[11] || undefined,
    created_at:       r[12] || undefined,
    updated_at:       r[13] || undefined,
  };
}

export function recetaToRow(r: Receta): string[] {
  return [
    r.id, r.titulo, r.descripcion || "",
    r.ingredientes, r.pasos || "",
    r.tipo_comida, String(r.tiempo_estimado ?? ""),
    r.dificultad || "facil",
    (r.etiquetas ?? []).join(","),
    r.observaciones || "", r.compatibilidades || "",
    r.imagen_url || "",
    r.created_at || new Date().toISOString(),
    new Date().toISOString(),
  ];
}
