// ============================================================
// TIPOS GLOBALES DE LA APP SONIA NUTRICIÓN
// ============================================================

export interface Paciente {
  id: string
  nombre: string
  apellidos: string
  fecha_alta: string
  fecha_nacimiento: string
  sexo: 'masculino' | 'femenino' | 'otro'
  telefono: string
  email: string
  objetivo_principal: string
  antecedentes: string
  patologias: string
  medicacion: string
  alergias: string
  intolerancias: string
  preferencias_alimentarias: string
  alimentos_no_gustan: string
  actividad_fisica: 'sedentario' | 'ligero' | 'moderado' | 'activo' | 'muy_activo'
  horarios_habituales: string
  hace_ayuno: boolean
  ventana_ayuno?: string
  sintomas_digestivos: string
  observaciones_generales: string
  notas_privadas: string
  tiene_balon_gastrico: boolean
  activo: boolean
  created_at: string
}

export interface BalanGastrico {
  id: string
  paciente_id: string
  fecha_colocacion: string
  fase: 'liquida' | 'semiliquida' | 'adaptacion' | 'blanda' | 'normal'
  tolerancia_general: 'buena' | 'regular' | 'mala'
  nauseas: 'ninguna' | 'leves' | 'moderadas' | 'frecuentes'
  vomitos: 'ninguno' | 'ocasionales' | 'frecuentes'
  reflujo: 'ninguno' | 'leve' | 'moderado' | 'intenso'
  estrenimiento: boolean
  diarrea: boolean
  saciedad: 'normal' | 'alta' | 'muy_alta'
  hambre_emocional: 'baja' | 'media' | 'alta'
  alimentos_peor_tolerados: string
  observaciones: string
  updated_at: string
}

export interface Consulta {
  id: string
  paciente_id: string
  fecha: string
  motivo: string
  evolucion_anterior: string
  adherencia: 'muy_buena' | 'buena' | 'regular' | 'mala'
  sintomas: string
  energia: 'muy_baja' | 'baja' | 'normal' | 'buena' | 'muy_buena'
  hambre_saciedad: string
  observaciones: string
  cambios_acordados: string
  notas_privadas: string
  conclusion: string
  created_at: string
}

export interface Medicion {
  id: string
  paciente_id: string
  fecha: string
  peso: number
  imc?: number
  porcentaje_grasa?: number
  masa_muscular?: number
  agua_corporal?: number
  grasa_visceral?: number
  perimetro_cintura?: number
  perimetro_cadera?: number
  perimetro_abdomen?: number
  masa_osea?: number
  metabolismo_basal?: number
  edad_metabolica?: number
  observaciones?: string
  created_at?: string
}

export type TipoComida = 'desayuno' | 'media_manana' | 'comida' | 'merienda' | 'cena' | 'snack'
export type MomentoComida = 'desayuno' | 'media_manana' | 'comida' | 'merienda' | 'cena'
export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'

export interface Receta {
  id: string
  titulo: string
  descripcion: string
  ingredientes: string
  pasos: string
  tipo_comida: TipoComida
  tiempo_estimado: number
  dificultad: 'facil' | 'media' | 'dificil'
  etiquetas: string[]
  observaciones: string
  compatibilidades?: string
  created_at?: string
}

export interface PlanItem {
  id: string
  plan_id: string
  dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'
  momento: TipoComida
  receta_id?: string
  descripcion_libre?: string
  observaciones?: string
}

export interface PlanSemanal {
  id: string
  paciente_id: string
  nombre: string
  fecha_inicio: string
  fecha_fin?: string
  observaciones_generales: string
  kcal_objetivo?: number
  activo: boolean
  created_at?: string
  items?: PlanItem[]
}
