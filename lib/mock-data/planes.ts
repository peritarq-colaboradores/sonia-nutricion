import type { PlanSemanal, PlanItem } from "@/types";

export const mockPlanItems: PlanItem[] = [
  // Plan p1_plan1 — María González
  { id: "pi1",  plan_id: "plan1", dia: "lunes",    momento: "desayuno",    receta_id: "r1", descripcion_libre: undefined, observaciones: "" },
  { id: "pi2",  plan_id: "plan1", dia: "lunes",    momento: "media_manana", receta_id: undefined, descripcion_libre: "Manzana + 15 almendras" },
  { id: "pi3",  plan_id: "plan1", dia: "lunes",    momento: "comida",       receta_id: "r4", observaciones: "Porción reducida" },
  { id: "pi4",  plan_id: "plan1", dia: "lunes",    momento: "merienda",     receta_id: undefined, descripcion_libre: "Yogur griego 0% + nueces" },
  { id: "pi5",  plan_id: "plan1", dia: "lunes",    momento: "cena",         receta_id: "r2" },

  { id: "pi6",  plan_id: "plan1", dia: "martes",   momento: "desayuno",     receta_id: "r8" },
  { id: "pi7",  plan_id: "plan1", dia: "martes",   momento: "media_manana", receta_id: undefined, descripcion_libre: "Kéfir + fruta de temporada" },
  { id: "pi8",  plan_id: "plan1", dia: "martes",   momento: "comida",       receta_id: "r3" },
  { id: "pi9",  plan_id: "plan1", dia: "martes",   momento: "merienda",     receta_id: "r6" },
  { id: "pi10", plan_id: "plan1", dia: "martes",   momento: "cena",         receta_id: "r5" },

  { id: "pi11", plan_id: "plan1", dia: "miercoles", momento: "desayuno",   receta_id: "r1" },
  { id: "pi12", plan_id: "plan1", dia: "miercoles", momento: "comida",     receta_id: "r7" },
  { id: "pi13", plan_id: "plan1", dia: "miercoles", momento: "cena",       receta_id: "r2" },

  { id: "pi14", plan_id: "plan1", dia: "jueves",   momento: "desayuno",    receta_id: "r8" },
  { id: "pi15", plan_id: "plan1", dia: "jueves",   momento: "comida",      receta_id: "r4" },
  { id: "pi16", plan_id: "plan1", dia: "jueves",   momento: "cena",        receta_id: "r5" },

  { id: "pi17", plan_id: "plan1", dia: "viernes",  momento: "desayuno",   receta_id: "r1" },
  { id: "pi18", plan_id: "plan1", dia: "viernes",  momento: "comida",     receta_id: "r3" },
  { id: "pi19", plan_id: "plan1", dia: "viernes",  momento: "cena",       receta_id: "r2" },

  { id: "pi20", plan_id: "plan1", dia: "sabado",   momento: "desayuno",   receta_id: undefined, descripcion_libre: "Desayuno libre saludable" },
  { id: "pi21", plan_id: "plan1", dia: "sabado",   momento: "comida",     receta_id: "r7" },
  { id: "pi22", plan_id: "plan1", dia: "sabado",   momento: "cena",       receta_id: undefined, descripcion_libre: "Cena libre moderada" },

  { id: "pi23", plan_id: "plan1", dia: "domingo",  momento: "desayuno",   receta_id: undefined, descripcion_libre: "Brunch familiar" },
  { id: "pi24", plan_id: "plan1", dia: "domingo",  momento: "comida",     receta_id: "r4" },
  { id: "pi25", plan_id: "plan1", dia: "domingo",  momento: "cena",       receta_id: "r5" },
];

export const mockPlanes: PlanSemanal[] = [
  {
    id: "plan1",
    paciente_id: "p1",
    nombre: "Plan Semana 1 — Inicio proceso",
    fecha_inicio: "2024-01-15",
    fecha_fin: "2024-01-21",
    observaciones_generales: "Primera pauta. Énfasis en proteína en desayuno y reducción de ultraprocesados. Sin restricciones extremas.",
    kcal_objetivo: 1600,
    activo: false,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "plan2",
    paciente_id: "p1",
    nombre: "Plan Semana 6 — Batch cooking",
    fecha_inicio: "2024-02-26",
    fecha_fin: "2024-03-03",
    observaciones_generales: "Introducción de batch cooking. Mayor variedad. Snack tarde proteico.",
    kcal_objetivo: 1550,
    activo: true,
    created_at: "2024-02-26T10:00:00Z",
  },
  {
    id: "plan3",
    paciente_id: "p2",
    nombre: "Plan balón — Fase semilíquida",
    fecha_inicio: "2024-02-10",
    fecha_fin: "2024-02-24",
    observaciones_generales: "Fase adaptación balón gástrico. Texturas muy suaves y progresivas. Comidas pequeñas y frecuentes.",
    kcal_objetivo: 1000,
    activo: false,
    created_at: "2024-02-10T09:30:00Z",
  },
  {
    id: "plan4",
    paciente_id: "p2",
    nombre: "Plan balón — Fase blanda",
    fecha_inicio: "2024-03-08",
    fecha_fin: "2024-03-22",
    observaciones_generales: "Transición a textura blanda. Proteína en cada comida. Sin pan ni pasta.",
    kcal_objetivo: 1200,
    activo: true,
    created_at: "2024-03-08T09:30:00Z",
  },
];
