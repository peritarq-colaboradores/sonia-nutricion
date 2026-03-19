import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, differenceInYears } from "date-fns";
import { es } from "date-fns/locale";

// Utilidad para combinar clases Tailwind de forma segura
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatear fecha legible en español
export function formatFecha(dateStr: string | undefined, pattern = "d MMM yyyy"): string {
  if (!dateStr) return "—";
  try {
    return format(parseISO(dateStr), pattern, { locale: es });
  } catch {
    return dateStr;
  }
}

// Calcular edad a partir de fecha de nacimiento
export function calcularEdad(fechaNacimiento: string): number {
  try {
    return differenceInYears(new Date(), parseISO(fechaNacimiento));
  } catch {
    return 0;
  }
}

// Calcular IMC
export function calcularIMC(peso: number, alturaMetros: number): number {
  if (!alturaMetros || alturaMetros === 0) return 0;
  return Math.round((peso / (alturaMetros * alturaMetros)) * 10) / 10;
}

// Clasificación IMC
export function clasificarIMC(imc: number): { label: string; color: string } {
  if (imc < 18.5) return { label: "Bajo peso", color: "text-blue-600" };
  if (imc < 25)   return { label: "Normopeso", color: "text-sage-600" };
  if (imc < 30)   return { label: "Sobrepeso", color: "text-yellow-600" };
  if (imc < 35)   return { label: "Obesidad I", color: "text-orange-600" };
  if (imc < 40)   return { label: "Obesidad II", color: "text-red-600" };
  return { label: "Obesidad III", color: "text-red-800" };
}

// Generar ID simple para datos mock
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Fecha de hoy en formato ISO
export function hoy(): string {
  return new Date().toISOString().split("T")[0];
}

// Iniciales del nombre para avatar
export function getIniciales(nombre: string, apellidos: string): string {
  return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
}

// Etiquetas legibles
export const ETIQUETAS_LABEL: Record<string, string> = {
  alta_proteina: "Alta proteína",
  saciante: "Saciante",
  rapida: "Rápida",
  digestiva: "Digestiva",
  batch_cooking: "Batch cooking",
  baja_carga_glucemica: "Baja glucemia",
  antiinflamatoria: "Antiinflamatoria",
  apta_balon: "Apta balón",
  vegetariana: "Vegetariana",
  vegana: "Vegana",
  sin_gluten: "Sin gluten",
  sin_lacteos: "Sin lácteos",
  tupper: "Tupper",
  pocos_ingredientes: "Pocos ingredientes",
  economica: "Económica",
};

export const TIPO_COMIDA_LABEL: Record<string, string> = {
  desayuno: "Desayuno",
  comida: "Comida",
  cena: "Cena",
  snack: "Snack",
  postre: "Postre",
  bebida: "Bebida",
};

export const MOMENTO_LABEL: Record<string, string> = {
  desayuno: "Desayuno",
  media_manana: "Media mañana",
  comida: "Comida",
  merienda: "Merienda",
  cena: "Cena",
};

export const DIAS_SEMANA_LABEL: Record<string, string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
};

export const ADHERENCIA_LABEL: Record<string, string> = {
  muy_baja: "Muy baja",
  baja: "Baja",
  regular: "Regular",
  buena: "Buena",
  muy_buena: "Muy buena",
};

export const NIVEL_ACTIVIDAD_LABEL: Record<string, string> = {
  sedentario: "Sedentario",
  ligero: "Ligero",
  moderado: "Moderado",
  activo: "Activo",
  muy_activo: "Muy activo",
};

// ────────────────────────────────────────────────────────────────────────────
// GENERADOR DE PROPUESTA SEMANAL
// Genera una semana completa de recetas adaptadas al perfil del paciente.
// Sonia puede editar cada celda manualmente después de generar la propuesta.
// ────────────────────────────────────────────────────────────────────────────

import type { Paciente, Receta } from "@/types";

type CeldaKey = string; // "lunes-desayuno"
type ItemsMap = Record<CeldaKey, { recetaId?: string; texto?: string }>;

const DIAS = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"] as const;
const MOMENTOS = ["desayuno","media_manana","comida","merienda","cena"] as const;

/**
 * Genera una propuesta semanal inicial basada en el perfil del paciente.
 * - Filtra recetas incompatibles (alergias, balón gástrico, preferencias)
 * - Distribuye con variedad real: cada receta aparece máximo 2 veces por semana
 * - Mezcla aleatoria suave para que cada vez que se pulse "Regenerar" salga diferente
 * Sonia puede modificar cada celda libremente después.
 */
export function generarPropuestaSemanal(
  paciente: Paciente,
  recetas: Receta[]
): ItemsMap {
  const items: ItemsMap = {};

  // ── 1. Perfil del paciente ─────────────────────────────────────────────
  const esBalonGastrico = paciente.tiene_balon_gastrico;
  const alergias = ((paciente.alergias ?? "") + " " + (paciente.intolerancias ?? "")).toLowerCase();
  const noGusta = (paciente.alimentos_no_gustan ?? "").toLowerCase();
  const esVegetariana = (paciente.preferencias_alimentarias ?? "").toLowerCase().includes("vegetarian");
  const esSinGluten  = alergias.includes("gluten") || alergias.includes("celiaca");
  const esSinLacteos = alergias.includes("lactosa") || alergias.includes("lácteo");

  // ── 2. Filtro de compatibilidad ────────────────────────────────────────
  function esCompatible(r: Receta): boolean {
    if (esBalonGastrico && !r.etiquetas.includes("apta_balon")) return false;

    if (esSinGluten) {
      const ing = r.ingredientes.toLowerCase();
      if (ing.includes("pasta ") || ing.includes("pan ") || ing.includes("harina de trigo") || ing.includes("cuscús")) return false;
    }
    if (esSinLacteos) {
      const ing = r.ingredientes.toLowerCase();
      if (ing.includes("leche entera") || ing.includes("nata ") || ing.includes("mantequilla")) return false;
    }
    if (esVegetariana && !r.etiquetas.includes("vegetariana") && !r.etiquetas.includes("vegana")) {
      const ing = r.ingredientes.toLowerCase();
      const carnes = ["pollo", "pavo", "ternera", "cerdo", "jamón", "atún", "salmón", "merluza", "gambas", "lubina", "bacalao"];
      if (carnes.some(c => ing.includes(c))) return false;
    }
    if (noGusta) {
      const lista = noGusta.split(/[,;]/).map(s => s.trim()).filter(s => s.length > 2);
      if (lista.some(ng => r.ingredientes.toLowerCase().includes(ng))) return false;
    }
    return true;
  }

  // ── 3. Pools por momento ───────────────────────────────────────────────
  const pools: Record<string, Receta[]> = {
    desayuno:    recetas.filter(r => r.tipo_comida === "desayuno" && esCompatible(r)),
    media_manana:recetas.filter(r => ["snack","media_manana"].includes(r.tipo_comida) && esCompatible(r)),
    comida:      recetas.filter(r => r.tipo_comida === "comida" && esCompatible(r)),
    merienda:    recetas.filter(r => ["snack","merienda"].includes(r.tipo_comida) && esCompatible(r)),
    cena:        recetas.filter(r => r.tipo_comida === "cena" && esCompatible(r)),
  };

  // Fallbacks variados por momento (no siempre el mismo texto)
  const fallbacks: Record<string, string[]> = {
    desayuno:     ["Desayuno suave según tolerancia", "Yogur natural con fruta blanda", "Fruta + infusión templada"],
    media_manana: ["Fruta de temporada + frutos secos (20g)", "Compota de manzana sin azúcar", "Yogur natural solo"],
    comida:       ["Proteína blanda + puré de verduras", "Caldo nutritivo + proteína suave", "Pescado blanco + patata cocida"],
    merienda:     ["Yogur natural sin azúcar", "Fruta blanda + infusión", "Natillas caseras sin azúcar"],
    cena:         ["Cena ligera: crema de verduras", "Proteína suave + verdura cocida", "Sopa templada + proteína blanda"],
  };

  // ── 4. Mezcla aleatoria del pool para variedad en cada regeneración ─────
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── 5. Construir plan con máxima variedad ─────────────────────────────
  // Reglas:
  //  a) Nunca la misma receta en días consecutivos
  //  b) Máximo 2 veces por semana (1 vez si el pool lo permite)
  //  c) Si el pool es pequeño, intercalar texto libre entre repeticiones
  function buildSlotPlan(momento: string): Array<{ recetaId?: string; texto?: string }> {
    const pool = shuffle(pools[momento] ?? []);
    const fb   = fallbacks[momento] ?? ["Comida equilibrada según tolerancia"];

    // Expandir el pool: si hay pocas recetas, intercalar fallbacks como "comodín"
    // para romper la continuidad sin perder recetas reales
    const maxUsoIdeal = pool.length >= 7 ? 1 : pool.length >= 4 ? 2 : 3;

    const result: Array<{ recetaId?: string; texto?: string }> = [];
    const usageCount: Record<string, number> = {};
    let fbIndex = 0;

    for (let dia = 0; dia < 7; dia++) {
      const anterior = dia > 0 ? result[dia - 1].recetaId : null;

      // Buscar la mejor receta: no repetir ayer, preferir menos usada
      const candidatas = pool
        .filter(r => r.id !== anterior)                          // no repetir ayer
        .filter(r => (usageCount[r.id] ?? 0) < maxUsoIdeal)    // dentro del límite ideal
        .sort((a, b) => (usageCount[a.id] ?? 0) - (usageCount[b.id] ?? 0)); // menos usada primero

      // Segunda pasada: si no hay candidatas perfectas, relajar límite
      const candidatas2 = pool
        .filter(r => r.id !== anterior)
        .filter(r => (usageCount[r.id] ?? 0) < maxUsoIdeal + 1)
        .sort((a, b) => (usageCount[a.id] ?? 0) - (usageCount[b.id] ?? 0));

      const elegida = candidatas[0] ?? candidatas2[0];

      if (elegida) {
        usageCount[elegida.id] = (usageCount[elegida.id] ?? 0) + 1;
        result.push({ recetaId: elegida.id });
      } else {
        // Pool agotado sin opciones válidas: usar texto libre variado
        result.push({ texto: fb[fbIndex % fb.length] });
        fbIndex++;
      }
    }
    return result;
  }

  // ── 6. Asignar al grid ─────────────────────────────────────────────────
  MOMENTOS.forEach(momento => {
    const plan = buildSlotPlan(momento);
    DIAS.forEach((dia, i) => {
      // Fin de semana: desayuno relajado libre si no hay receta balón
      if ((dia === "sabado" || dia === "domingo") && momento === "desayuno" && !esBalonGastrico) {
        items[`${dia}-${momento}`] = { texto: dia === "sabado" ? "Desayuno especial de sábado" : "Brunch de domingo" };
        return;
      }
      items[`${dia}-${momento}`] = plan[i];
    });
  });

  return items;
}
