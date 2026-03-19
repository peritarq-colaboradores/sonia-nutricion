# Sonia Nutrición — Instrucciones de instalación y uso

## Requisitos previos

Necesitas tener instalado **Node.js** (versión 18 o superior).

### Descargar Node.js
Ve a [https://nodejs.org](https://nodejs.org) y descarga la versión **LTS** (Long Term Support).
Instala siguiendo el asistente. Reinicia el ordenador si es necesario.

---

## Instalar y arrancar la aplicación

Abre una terminal (PowerShell o Símbolo del Sistema) en la carpeta del proyecto:

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo
npm run dev
```

Una vez arrancado, abre tu navegador en:
```
http://localhost:3000
```

---

## Modo demo (sin Supabase)

La aplicación funciona completamente con datos de ejemplo sin necesidad de configurar Supabase.
Los datos demo incluyen:
- 4 pacientes con fichas completas
- Historial de consultas y mediciones
- Biblioteca de 8 recetas
- Planes semanales de ejemplo

---

## Conectar Supabase (base de datos real)

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta el contenido de `supabase-schema.sql`
4. En **Settings > API**, copia:
   - Project URL
   - anon/public key
5. Edita el archivo `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
NEXT_PUBLIC_DEMO_MODE=false
```

6. Reinicia el servidor: `npm run dev`

---

## Mapa de pantallas

| Ruta | Descripción |
|------|-------------|
| `/login` | Pantalla de acceso |
| `/dashboard` | Inicio con resumen |
| `/pacientes` | Listado de pacientes |
| `/pacientes/nuevo` | Crear nuevo paciente |
| `/pacientes/[id]` | Ficha completa del paciente |
| `/recetas` | Biblioteca de recetas |
| `/recetas/nueva` | Nueva receta |
| `/planes` | Planes semanales |
| `/planes/nuevo` | Crear plan semanal |
| `/planes/[id]` | Ver plan semanal |
| `/informes` | Centro de informes |
| `/informes/[id]/print` | Vista de impresión |

---

## Cómo imprimir / compartir un informe

1. Abre la ficha de un paciente
2. Haz clic en **"Informe"** (arriba a la derecha)
3. Se abre la vista de impresión en una nueva pestaña
4. Usa **"Imprimir / PDF"** para guardar como PDF o imprimir
5. Usa **"Copiar texto"** para pegar el resumen en un WhatsApp o email

---

## Tecnologías usadas

- **Next.js 14** — framework web
- **TypeScript** — tipado seguro
- **Tailwind CSS** — diseño visual
- **Supabase** — base de datos y autenticación
- **Lucide React** — iconos
- **Recharts** — gráficos (preparado para evolución)
- **date-fns** — manejo de fechas

---

## Próximas iteraciones sugeridas

- [ ] Gráfico de evolución de peso y mediciones
- [ ] Autenticación real con Supabase Auth
- [ ] Exportar PDF con librería headless (Puppeteer)
- [ ] Envío directo por email desde la app
- [ ] Cálculo automático de IMC al guardar medición
- [ ] Duplicar planes semanales
- [ ] Historial de cambios por paciente
- [ ] Vista móvil optimizada
