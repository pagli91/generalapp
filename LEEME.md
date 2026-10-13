# Generalapp — Cómo subirla a GitHub Pages

Esta carpeta tiene todo lo necesario para que Generalapp quede online con HTTPS,
se instale como app en iPhone y Android, y funcione sin internet.

**Archivos (NO cambiarles el nombre):**
- `index.html` — la app
- `manifest.webmanifest` — datos de la app (nombre, íconos)
- `service-worker.js` — hace que funcione sin internet
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` — íconos

---

## 1) Crear el repositorio

1. Entrá a https://github.com e iniciá sesión.
2. Arriba a la derecha, tocá **+** → **New repository**.
3. En **Repository name** poné por ejemplo: `generalapp`
4. Dejalo en **Public** (importante: con cuenta gratis, Pages necesita que sea público).
5. Tocá **Create repository**.

## 2) Subir los archivos

1. En la página del repo nuevo, tocá **Add file** → **Upload files**
   (o el link "uploading an existing file").
2. Arrastrá **todos los archivos de esta carpeta** a la zona de subida.
   ⚠️ Importante: subí los archivos **sueltos**, no la carpeta entera.
   `index.html` tiene que quedar en la raíz del repositorio.
3. Abajo, tocá **Commit changes**.

## 3) Activar GitHub Pages

1. En el repo, andá a **Settings** (arriba) → **Pages** (menú de la izquierda).
2. En **Source**, elegí **Deploy from a branch**.
3. En **Branch**, elegí **main** y carpeta **/ (root)**. Tocá **Save**.
4. Esperá 1–2 minutos y refrescá. Va a aparecer la dirección, del estilo:

   `https://TU-USUARIO.github.io/generalapp/`

## 4) Instalar en el teléfono

Abrí esa dirección en el teléfono y:

- **iPhone (Safari):** botón **Compartir** → **Agregar a inicio**.
- **Android (Chrome):** menú **⋮** → **Instalar app** (o **Agregar a pantalla principal**).

¡Listo! Queda el ícono del dado y abre a pantalla completa. Después de abrirla
una vez con internet, funciona también sin conexión.

---

## Si más adelante cambiás la app

1. Subí el nuevo `index.html` (Add file → Upload files, reemplaza el anterior).
2. Abrí `service-worker.js` en GitHub, tocá el lápiz ✏️ y cambiá `generalapp-v1`
   por `generalapp-v2` (subí el número). Commit.

Eso hace que la app se actualice sola en los teléfonos la próxima vez que se abra con internet.
