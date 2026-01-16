# Guía de Deployment - C Planning Dashboard

Esta guía te mostrará cómo desplegar la aplicación en **Railway** (Backend + DB) y **Vercel** (Frontend).

## Paso 1: Preparar el repositorio en GitHub

1. Crea un repositorio en GitHub (si aún no lo tienes)
2. Sube el código:

```bash
cd /Users/adelrio/c-planning-dashboard
git init
git add .
git commit -m "Initial commit - C Planning Dashboard"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/c-planning-dashboard.git
git push -u origin main
```

## Paso 2: Deploy del Backend en Railway

### 2.1 Crear cuenta en Railway
1. Ve a [railway.app](https://railway.app)
2. Haz login con tu cuenta de GitHub

### 2.2 Crear proyecto y base de datos
1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Autoriza Railway para acceder a tu repositorio
4. Selecciona el repositorio `c-planning-dashboard`
5. Railway detectará automáticamente que es un proyecto Python

### 2.3 Agregar PostgreSQL
1. En tu proyecto de Railway, click en "+ New"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará automáticamente la base de datos

### 2.4 Configurar variables de entorno del Backend
1. Click en el servicio de tu aplicación (backend)
2. Ve a "Variables"
3. Agrega las siguientes variables:

```
PORT=3001
POSTGRES_USER=postgres
POSTGRES_PASSWORD=[Railway auto-genera esto]
POSTGRES_HOST=[Railway auto-genera esto]
POSTGRES_PORT=5432
POSTGRES_DB=railway
ALLOWED_ORIGINS=https://tu-app.vercel.app,http://localhost:5174
```

**Nota**: Railway conecta automáticamente tu app con PostgreSQL. Solo necesitas configurar `ALLOWED_ORIGINS`.

### 2.5 Configurar el Root Directory
1. En Settings del servicio backend
2. Busca "Root Directory"
3. Establece: `backend`
4. Guarda los cambios

### 2.6 Deploy
1. Railway desplegará automáticamente
2. Una vez terminado, copia la URL pública (algo como `https://c-planning-backend.up.railway.app`)

## Paso 3: Deploy del Frontend en Vercel

### 3.1 Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz login con tu cuenta de GitHub

### 3.2 Importar proyecto
1. Click en "Add New..." → "Project"
2. Importa tu repositorio `c-planning-dashboard`
3. Vercel detectará automáticamente que es un proyecto Vite

### 3.3 Configurar el proyecto
1. **Root Directory**: Establece `frontend`
2. **Build Command**: `npm run build` (default)
3. **Output Directory**: `dist` (default)
4. **Install Command**: `npm install` (default)

### 3.4 Variables de entorno
Agrega esta variable de entorno:

```
VITE_API_URL=https://c-planning-backend.up.railway.app
```

(Reemplaza con la URL real de tu backend en Railway)

### 3.5 Deploy
1. Click en "Deploy"
2. Vercel construirá y desplegará tu aplicación
3. Una vez terminado, obtendrás una URL como `https://c-planning-dashboard.vercel.app`

## Paso 4: Actualizar CORS en Railway

1. Regresa a Railway
2. Ve a las variables de entorno de tu backend
3. Actualiza `ALLOWED_ORIGINS` con tu URL de Vercel:

```
ALLOWED_ORIGINS=https://c-planning-dashboard.vercel.app,http://localhost:5174
```

4. Railway redesplegará automáticamente

## Paso 5: Ejecutar migraciones

1. En Railway, ve a tu servicio de backend
2. Click en "Settings" → "Service"
3. Busca la sección de "Deploy Logs"
4. La aplicación ejecutará `init_db()` automáticamente al iniciar
5. Para ejecutar la migración de comentarios manualmente:
   - Conéctate a tu base de datos PostgreSQL desde Railway
   - Ejecuta: `ALTER TABLE initiatives ADD COLUMN IF NOT EXISTS comments TEXT;`

O usa el script de migración incluido en `backend/database/add_comments_column.sql`

## ¡Listo!

Tu aplicación ahora está en línea en:
- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-backend.up.railway.app`

Comparte el link del frontend con quien quieras y podrán ver y editar la aplicación.

## Mantenimiento

### Actualizar la aplicación
Cada vez que hagas cambios y los subas a GitHub:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Tanto Railway como Vercel redesplegarán automáticamente.

### Ver logs
- **Railway**: En el dashboard → selecciona tu servicio → "Deployments" → "View Logs"
- **Vercel**: En el dashboard → selecciona tu proyecto → "Deployments" → click en un deployment → "View Function Logs"

### Dominios personalizados (Opcional)
Tanto Railway como Vercel permiten agregar dominios personalizados:
- En Vercel: Settings → Domains
- En Railway: Settings → Networking → Custom Domains

## Troubleshooting

### Error de CORS
Si ves errores de CORS en la consola del navegador:
1. Verifica que `ALLOWED_ORIGINS` en Railway incluya tu URL de Vercel
2. Asegúrate de que no haya espacios en la variable

### Error de conexión a base de datos
1. Verifica que las variables de entorno de PostgreSQL estén correctamente configuradas
2. Railway suele conectar automáticamente la DB, pero verifica en "Variables" que existan todas las credenciales

### Frontend no se conecta al backend
1. Verifica que `VITE_API_URL` en Vercel tenga la URL correcta de Railway
2. Asegúrate de que la URL no tenga una barra al final (`/`)
