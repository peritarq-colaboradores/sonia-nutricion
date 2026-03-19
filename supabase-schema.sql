-- ============================================================
-- SCHEMA DE BASE DE DATOS — Sonia Nutrición
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLA: pacientes
-- ============================================================
CREATE TABLE IF NOT EXISTS pacientes (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre                      TEXT NOT NULL,
  apellidos                   TEXT NOT NULL,
  fecha_alta                  DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_nacimiento            DATE NOT NULL,
  sexo                        TEXT CHECK (sexo IN ('masculino', 'femenino', 'otro')),
  telefono                    TEXT,
  email                       TEXT,
  objetivo_principal          TEXT,
  antecedentes                TEXT,
  patologias                  TEXT,
  medicacion                  TEXT,
  alergias                    TEXT,
  intolerancias               TEXT,
  preferencias_alimentarias   TEXT,
  alimentos_no_gustan         TEXT,
  actividad_fisica            TEXT CHECK (actividad_fisica IN ('sedentario','ligero','moderado','activo','muy_activo')),
  horarios_habituales         TEXT,
  hace_ayuno                  BOOLEAN DEFAULT FALSE,
  ventana_ayuno               TEXT,
  sintomas_digestivos         TEXT,
  observaciones_generales     TEXT,
  notas_privadas              TEXT,
  tiene_balon_gastrico        BOOLEAN DEFAULT FALSE,
  activo                      BOOLEAN DEFAULT TRUE,
  created_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: balon_gastrico
-- ============================================================
CREATE TABLE IF NOT EXISTS balon_gastrico (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  paciente_id                 UUID NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
  fecha_colocacion            DATE,
  fase                        TEXT CHECK (fase IN ('pre_colocacion','primer_mes','adaptacion','mantenimiento','pre_retirada','post_retirada')),
  tolerancia_general          TEXT CHECK (tolerancia_general IN ('muy_mala','mala','regular','buena','muy_buena')),
  nauseas                     TEXT CHECK (nauseas IN ('sin','leves','moderadas','severas')),
  vomitos                     TEXT CHECK (vomitos IN ('sin','ocasionales','frecuentes','diarios')),
  reflujo                     TEXT CHECK (reflujo IN ('sin','leve','moderado','severo')),
  estrenimiento               BOOLEAN DEFAULT FALSE,
  diarrea                     BOOLEAN DEFAULT FALSE,
  saciedad                    TEXT CHECK (saciedad IN ('baja','normal','alta','muy_alta')),
  hambre_emocional            TEXT CHECK (hambre_emocional IN ('baja','normal','alta','muy_alta')),
  alimentos_peor_tolerados    TEXT,
  observaciones               TEXT,
  updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: consultas
-- ============================================================
CREATE TABLE IF NOT EXISTS consultas (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  paciente_id                 UUID NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
  fecha                       DATE NOT NULL,
  motivo                      TEXT,
  evolucion_anterior          TEXT,
  adherencia                  TEXT CHECK (adherencia IN ('muy_baja','baja','regular','buena','muy_buena')),
  sintomas                    TEXT,
  energia                     TEXT CHECK (energia IN ('muy_baja','baja','normal','buena','muy_buena')),
  hambre_saciedad             TEXT,
  observaciones               TEXT,
  cambios_acordados           TEXT,
  notas_privadas              TEXT,
  conclusion                  TEXT,
  plan_semanal_id             UUID,
  created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: mediciones
-- ============================================================
CREATE TABLE IF NOT EXISTS mediciones (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  paciente_id                 UUID NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
  fecha                       DATE NOT NULL,
  peso                        DECIMAL(5,2),
  imc                         DECIMAL(4,1),
  porcentaje_grasa            DECIMAL(4,1),
  masa_muscular               DECIMAL(5,2),
  agua_corporal               DECIMAL(4,1),
  grasa_visceral              SMALLINT,
  perimetro_cintura           DECIMAL(5,1),
  perimetro_cadera            DECIMAL(5,1),
  perimetro_abdomen           DECIMAL(5,1),
  masa_osea                   DECIMAL(4,2),
  metabolismo_basal           SMALLINT,
  edad_metabolica             SMALLINT,
  masa_libre_grasa            DECIMAL(5,2),
  observaciones               TEXT,
  created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: recetas
-- ============================================================
CREATE TABLE IF NOT EXISTS recetas (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo                      TEXT NOT NULL,
  descripcion                 TEXT,
  ingredientes                TEXT NOT NULL,
  pasos                       TEXT,
  tipo_comida                 TEXT CHECK (tipo_comida IN ('desayuno','comida','cena','snack','postre','bebida')),
  tiempo_estimado             SMALLINT,
  dificultad                  TEXT CHECK (dificultad IN ('facil','media','elaborada')),
  etiquetas                   TEXT[],
  observaciones               TEXT,
  compatibilidades            TEXT,
  imagen_url                  TEXT,
  created_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: planes_semanales
-- ============================================================
CREATE TABLE IF NOT EXISTS planes_semanales (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  paciente_id                 UUID NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
  nombre                      TEXT NOT NULL,
  fecha_inicio                DATE,
  fecha_fin                   DATE,
  observaciones_generales     TEXT,
  kcal_objetivo               SMALLINT,
  activo                      BOOLEAN DEFAULT TRUE,
  created_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: plan_items
-- ============================================================
CREATE TABLE IF NOT EXISTS plan_items (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plan_id                     UUID NOT NULL REFERENCES planes_semanales(id) ON DELETE CASCADE,
  dia                         TEXT NOT NULL CHECK (dia IN ('lunes','martes','miercoles','jueves','viernes','sabado','domingo')),
  momento                     TEXT NOT NULL CHECK (momento IN ('desayuno','media_manana','comida','merienda','cena')),
  receta_id                   UUID REFERENCES recetas(id) ON DELETE SET NULL,
  descripcion_libre           TEXT,
  observaciones               TEXT,
  orden                       SMALLINT DEFAULT 0
);

-- ============================================================
-- TABLA: informes_generados
-- ============================================================
CREATE TABLE IF NOT EXISTS informes_generados (
  id                          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  paciente_id                 UUID NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
  tipo                        TEXT CHECK (tipo IN ('seguimiento','plan_semanal','resumen_consulta','evolucion_mediciones')),
  titulo                      TEXT NOT NULL,
  contenido_json              JSONB,
  fecha_generacion            TIMESTAMPTZ DEFAULT NOW(),
  compartido                  BOOLEAN DEFAULT FALSE,
  created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES para mejorar rendimiento
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_consultas_paciente ON consultas(paciente_id, fecha DESC);
CREATE INDEX IF NOT EXISTS idx_mediciones_paciente ON mediciones(paciente_id, fecha DESC);
CREATE INDEX IF NOT EXISTS idx_plan_items_plan ON plan_items(plan_id);
CREATE INDEX IF NOT EXISTS idx_planes_paciente ON planes_semanales(paciente_id, activo);
CREATE INDEX IF NOT EXISTS idx_informes_paciente ON informes_generados(paciente_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — Seguridad privada
-- ============================================================
-- Solo el usuario autenticado (Sonia) puede ver y modificar datos
ALTER TABLE pacientes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE balon_gastrico      ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE mediciones          ENABLE ROW LEVEL SECURITY;
ALTER TABLE recetas             ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes_semanales    ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE informes_generados  ENABLE ROW LEVEL SECURITY;

-- Política: solo usuarios autenticados acceden
CREATE POLICY "Solo acceso autenticado" ON pacientes
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON balon_gastrico
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON consultas
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON mediciones
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON recetas
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON planes_semanales
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON plan_items
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Solo acceso autenticado" ON informes_generados
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_pacientes_updated_at
  BEFORE UPDATE ON pacientes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_recetas_updated_at
  BEFORE UPDATE ON recetas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_planes_updated_at
  BEFORE UPDATE ON planes_semanales
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
