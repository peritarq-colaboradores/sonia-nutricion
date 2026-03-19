# Configurar Google Sheets como base de datos

Con esto, todo lo que guardes en la app (pacientes, consultas, mediciones...)
quedará registrado en un Google Sheet de tu cuenta de Google.

---

## PASO 1 — Crear el Google Sheet

1. Ve a **https://sheets.google.com** con tu cuenta de Google
2. Crea una hoja nueva
3. Nómbrala, por ejemplo: **"Sonia Nutrición — Datos"**
4. Crea estas pestañas (una por cada tipo de dato):
   - **Pacientes**
   - **Consultas**
   - **Mediciones**
   - **Recetas**
   - **Planes**
   - **PlanItems**
   - **BalonGastrico**

5. En cada pestaña, añade estos encabezados en la **fila 1**:

### Pestaña: Pacientes
```
id | nombre | apellidos | fecha_alta | fecha_nacimiento | sexo | telefono | email | objetivo_principal | antecedentes | patologias | medicacion | alergias | intolerancias | preferencias_alimentarias | alimentos_no_gustan | actividad_fisica | horarios_habituales | hace_ayuno | ventana_ayuno | sintomas_digestivos | observaciones_generales | notas_privadas | tiene_balon_gastrico | activo | created_at | updated_at
```

### Pestaña: Consultas
```
id | paciente_id | fecha | motivo | evolucion_anterior | adherencia | sintomas | energia | hambre_saciedad | observaciones | cambios_acordados | notas_privadas | conclusion | plan_semanas_id | created_at
```

### Pestaña: Mediciones
```
id | paciente_id | fecha | peso | imc | porcentaje_grasa | masa_muscular | agua_corporal | grasa_visceral | perimetro_cintura | perimetro_cadera | perimetro_abdomen | masa_osea | metabolismo_basal | edad_metabolica | masa_libre_grasa | observaciones | created_at
```

### Pestaña: Recetas
```
id | titulo | descripcion | ingredientes | pasos | tipo_comida | tiempo_estimado | dificultad | etiquetas | observaciones | compatibilidades | imagen_url | created_at | updated_at
```

### Pestaña: Planes
```
id | paciente_id | nombre | fecha_inicio | fecha_fin | observaciones_generales | kcal_objetivo | activo | created_at | updated_at
```

### Pestaña: PlanItems
```
id | plan_id | dia | momento | receta_id | descripcion_libre | observaciones | orden
```

### Pestaña: BalonGastrico
```
id | paciente_id | fecha_colocacion | fase | tolerancia_general | nauseas | vomitos | reflujo | estrenimiento | diarrea | saciedad | hambre_emocional | alimentos_peor_tolerados | observaciones | updated_at
```

---

## PASO 2 — Copiar el ID del spreadsheet

En la URL de tu hoja verás algo como:
```
https://docs.google.com/spreadsheets/d/1ABC123DEF456.../edit
```
El ID es la parte entre `/d/` y `/edit`. Cópialo, lo necesitarás luego.

---

## PASO 3 — Crear una cuenta de servicio en Google Cloud

1. Ve a **https://console.cloud.google.com**
2. Crea un proyecto nuevo (ponle el nombre que quieras)
3. En el menú lateral → **APIs y servicios** → **Biblioteca**
4. Busca **"Google Sheets API"** y actívala
5. Ve a **APIs y servicios** → **Credenciales**
6. Haz clic en **"Crear credenciales"** → **"Cuenta de servicio"**
7. Ponle un nombre (ej: "sonia-nutricion") y haz clic en "Crear"
8. Salta los pasos opcionales y haz clic en "Listo"
9. Haz clic en la cuenta de servicio que acabas de crear
10. Ve a la pestaña **"Claves"** → **"Agregar clave"** → **"Crear nueva clave"**
11. Selecciona **JSON** y descarga el archivo

---

## PASO 4 — Compartir el Sheet con la cuenta de servicio

1. Abre el archivo JSON que descargaste
2. Busca el campo `"client_email"` — es algo como `sonia@miproyecto.iam.gserviceaccount.com`
3. Ve a tu Google Sheet
4. Haz clic en **"Compartir"** (arriba a la derecha)
5. Pega el email de la cuenta de servicio
6. Dale permisos de **Editor**
7. Haz clic en **Enviar**

---

## PASO 5 — Configurar la app

1. Abre el archivo `.env.local` en la carpeta de la app (con el Bloc de notas)
2. Rellena los tres valores:

```
GOOGLE_SHEETS_ID=pega-aqui-el-id-del-spreadsheet

GOOGLE_SERVICE_ACCOUNT_EMAIL=pega-aqui-el-client_email-del-json

GOOGLE_SERVICE_ACCOUNT_KEY=pega-aqui-la-private_key-del-json
```

**Para la private_key:** copia todo el bloque desde `-----BEGIN PRIVATE KEY-----`
hasta `-----END PRIVATE KEY-----\n` inclusive.

3. Guarda el archivo
4. Reinicia la app (`Ctrl+C` en la terminal y vuelve a ejecutar `npm run dev`)

---

## ¡Listo!

A partir de ahora, todo lo que guardes en la app se escribirá directamente
en tu Google Sheet. Puedes verlo en tiempo real abriendo la hoja.

La app **sigue funcionando con datos de demo** si en algún momento
borras las credenciales o hay un error de conexión.
