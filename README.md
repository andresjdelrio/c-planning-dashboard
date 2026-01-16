# C-Level Planning Dashboard - Lean Value Tree

Dashboard profesional, editable y visualmente atractivo para planificación de nivel C (C-level planning) en formato Lean Value Tree, utilizando los colores de Falabella.

## 🎯 Características

- ✅ **Backend FastAPI** + PostgreSQL independiente
- ✅ **Frontend React** + TypeScript + Vite
- ✅ **Material-UI** con paleta de colores Falabella
- ✅ **AG Grid** para tablas editables enterprise-level
- ✅ **React Query** para sincronización de datos
- ✅ **Auto-save** con debounce (2 segundos)
- ✅ **Drag & Drop** para reordenar iniciativas
- 🔨 **Lean Value Tree** view (pendiente)
- 🔨 **Filtros** y búsqueda avanzada (pendiente)

## 🚀 Inicio Rápido

### Requisitos Previos

- PostgreSQL 16 instalado y corriendo
- Python 3.9+
- Node.js 18+
- npm

### Instalación y Ejecución

```bash
cd ~/c-planning-dashboard
./start-dev.sh
```

Este script:
- Verifica que PostgreSQL esté corriendo
- Inicia el backend (FastAPI) en puerto 3001
- Inicia el frontend (React) en puerto 5174
- Muestra logs y PIDs de los procesos

### Acceso a la Aplicación

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/docs
- **Health Check**: http://localhost:3001/health

## 📁 Estructura del Proyecto

```
c-planning-dashboard/
├── backend/
│   ├── main.py              # Punto de entrada FastAPI
│   ├── requirements.txt     # Dependencias Python
│   ├── .env                 # Variables de entorno
│   ├── database/
│   │   ├── models.py        # SQLAlchemy models
│   │   └── connection.py    # Configuración PostgreSQL
│   ├── api/
│   │   ├── app.py           # FastAPI app + CORS
│   │   └── routes/
│   │       └── initiatives.py  # CRUD endpoints
│   └── schemas/
│       └── initiative.py    # Pydantic schemas
├── frontend/
│   ├── package.json
│   ├── vite.config.ts      # Puerto 5174
│   ├── .env                # VITE_API_BASE_URL
│   └── src/
│       ├── config/
│       │   └── theme.ts    # MUI theme con colores Falabella
│       ├── types/
│       │   └── initiative.ts  # TypeScript interfaces
│       ├── services/
│       │   └── api.ts      # API client (axios)
│       ├── hooks/
│       │   ├── useInitiatives.ts  # React Query hooks
│       │   └── useAutoSave.ts     # Auto-save debounce
│       ├── utils/
│       │   └── colors.ts   # Paleta Falabella
│       └── components/     # (En desarrollo)
├── start-dev.sh            # Script de inicio
└── README.md
```

## 🗄️ Base de Datos

- **Nombre**: `c_planning_db`
- **Usuario**: adelrio
- **Puerto**: 5432
- **Tabla principal**: `initiatives`

### Modelo de Datos

```sql
CREATE TABLE initiatives (
    id VARCHAR(36) PRIMARY KEY,
    op1 VARCHAR(255) NOT NULL,
    op2 VARCHAR(255) NOT NULL,
    team VARCHAR(100) NOT NULL,
    op3 VARCHAR(255) NOT NULL,
    platform VARCHAR(255),
    initiatives TEXT NOT NULL,
    c VARCHAR(10),
    effort_level VARCHAR(50),
    resource VARCHAR(100),
    impact VARCHAR(50),
    priority VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Paleta de Colores Falabella

- **Verde Principal**: #00A651
- **Verde Claro**: #86BC25
- **Naranja Principal**: #FF6B00
- **Naranja Claro**: #F7931E
- **Azul Corporativo**: #0033A0
- **Rojo**: #E31E24

## 📡 API Endpoints

### Initiatives

- `GET /api/initiatives` - Listar todas las iniciativas
- `POST /api/initiatives` - Crear nueva iniciativa
- `PUT /api/initiatives/{id}` - Actualizar iniciativa
- `DELETE /api/initiatives/{id}` - Eliminar iniciativa
- `PATCH /api/initiatives/reorder` - Reordenar iniciativas

## 🛠️ Comandos Útiles

### Backend

```bash
# Iniciar backend manualmente
cd ~/c-planning-dashboard/backend
python3 main.py

# Ver logs
tail -f /tmp/c-planning-backend.log

# Verificar salud
curl http://localhost:3001/health
```

### Frontend

```bash
# Iniciar frontend manualmente
cd ~/c-planning-dashboard/frontend
npm run dev

# Ver logs
tail -f /tmp/c-planning-frontend.log

# Build para producción
npm run build
```

### PostgreSQL

```bash
# Conectar a la base de datos
/usr/local/opt/postgresql@16/bin/psql -d c_planning_db

# Ver tablas
\dt

# Ver datos de initiatives
SELECT * FROM initiatives;
```

### Detener Servicios

```bash
# Opción 1: Por nombre de proceso
pkill -f 'python3.*c-planning'
pkill -f 'vite.*5174'

# Opción 2: Por PIDs (mostrados al iniciar)
kill <BACKEND_PID> <FRONTEND_PID>
```

## 🔧 Desarrollo

### Agregar Nueva Dependencia Backend

```bash
cd ~/c-planning-dashboard/backend
pip3 install <package>
pip3 freeze | grep <package> >> requirements.txt
```

### Agregar Nueva Dependencia Frontend

```bash
cd ~/c-planning-dashboard/frontend
npm install <package>
```

## 🚨 Troubleshooting

### Error: Puerto ya en uso

```bash
# Backend (3001)
lsof -ti:3001 | xargs kill -9

# Frontend (5174)
lsof -ti:5174 | xargs kill -9
```

### Error: Base de datos no existe

```bash
/usr/local/opt/postgresql@16/bin/createdb c_planning_db
```

### Error: PostgreSQL no está corriendo

```bash
brew services start postgresql@16
```

## 📝 Próximas Funcionalidades

- [ ] AG Grid con edición inline completa
- [ ] Vista Lean Value Tree jerárquica
- [ ] Filtros avanzados (Team, Resource, Priority)
- [ ] Búsqueda de texto
- [ ] Export a CSV/Excel
- [ ] Drag & drop para reordenar
- [ ] Color coding por OP2 y Priority
- [ ] Métricas y KPIs dashboard
- [ ] Bulk operations

## 🔐 Seguridad

**IMPORTANTE**: Este proyecto está configurado para desarrollo local. Para producción:
- Usar variables de entorno seguras
- Implementar autenticación y autorización
- Configurar CORS correctamente
- Usar HTTPS
- Proteger endpoints sensibles

## 📄 Licencia

Proyecto privado - Uso interno

---

**Desarrollado con**: FastAPI + React + TypeScript + PostgreSQL + Material-UI + AG Grid
