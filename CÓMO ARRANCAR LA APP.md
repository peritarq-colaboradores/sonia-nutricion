# Cómo arrancar la app en tu ordenador

## PASO 1 — Instalar Node.js (solo la primera vez)

1. Ve a este enlace: **https://nodejs.org**
2. Haz clic en el botón verde grande que dice **"LTS"**
3. Descarga el instalador (.msi para Windows)
4. Ejecútalo y sigue los pasos (siguiente, siguiente, instalar)
5. Reinicia el ordenador

---

## PASO 2 — Instalar las dependencias (solo la primera vez)

1. Abre la carpeta **"App consultas Sonia"** en el escritorio
2. Haz clic derecho dentro de la carpeta → **"Abrir en Terminal"**
   (o busca "PowerShell" en el menú inicio y escribe `cd` + arrastra la carpeta)
3. Escribe este comando y pulsa Enter:
   ```
   npm install
   ```
4. Espera a que termine (puede tardar 1-2 minutos la primera vez)

---

## PASO 3 — Arrancar la app

En la misma terminal, escribe:
```
npm run dev
```

Verás un mensaje como:
```
▲ Next.js 14.2.5
- Local: http://localhost:3000
```

---

## PASO 4 — Abrir en el navegador

Abre **Google Chrome** y ve a:
```
http://localhost:3000
```

¡Ya está! La app abrirá con datos de demo listos para usar.

---

## Para cerrar la app

En la terminal, pulsa **Ctrl + C**

## Para volver a abrirla

Solo necesitas repetir el Paso 3 (`npm run dev`) y el Paso 4.
Los pasos 1 y 2 solo se hacen una vez.

---

## Acceso a la app (modo demo)

- **URL:** http://localhost:3000
- **Usuario/contraseña:** cualquiera (el modo demo no los valida)

---

## Guardar datos reales en Google Sheets (opcional)

Si quieres que los datos que introduces se guarden de verdad,
sigue las instrucciones del archivo `CONFIGURAR GOOGLE SHEETS.md`
