# C-Level Planning Dashboard - Quick Start

## 🚀 Start the Dashboard

```bash
cd ~/c-planning-dashboard
./start-dev.sh
```

This will start:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5174

## 🌐 Access the Dashboard

Open your browser and go to: **http://localhost:5174**

You should see:
- A green header with "C-Level Planning - Lean Value Tree"
- 6 sample initiatives in an editable AG Grid table
- "Add Initiative" and "Sync" buttons

## ✏️ How to Use

### 1. View Initiatives
- The AG Grid shows all initiatives with columns:
  - OP1, OP2, Team, OP3, Platform, Initiatives, C, Effort Level, Resource, Impact, Priority
- **Color coding**: Rows are color-coded by OP2 (Data definition, Data capture, etc.)

### 2. Edit an Initiative
- **Double-click** any cell to edit it
- Changes are **auto-saved** after 2 seconds
- Dropdowns available for: Team, C, Effort Level, Resource, Impact, Priority

### 3. Add New Initiative
- Click **"Add Initiative"** button in the header
- Fill out the form
- Click **"Create"**
- The new initiative will appear in the grid

### 4. Sort & Filter
- Click column headers to **sort**
- Use column filters (icon in header) to **filter** data
- Pagination at the bottom (50 rows per page)

### 5. Sync Data
- Click **"Sync"** button to refresh data from the backend

## 🛑 Stop the Dashboard

```bash
cd ~/c-planning-dashboard
./stop-dev.sh
```

Or manually:
```bash
pkill -f "python3.*c-planning-dashboard"
pkill -f "vite.*5174"
```

## 📊 Sample Data

The dashboard comes with 6 sample initiatives:
1. **Data definition**: Rules of the game
2. **Data definition**: Nav Understanding
3. **Data capture**: Cleanup operations in capture
4. **Data processing**: Cleanup operations in processing
5. **Data assets**: Data catalog
6. **FinOps**: Cost optimization

## 🔧 Troubleshooting

### Frontend won't load
```bash
cd ~/c-planning-dashboard/frontend
npm install
npm run dev
```

### Backend errors
```bash
cd ~/c-planning-dashboard/backend
pip3 install -r requirements.txt
python3 main.py
```

### Database issues
```bash
# Recreate database
/usr/local/opt/postgresql@16/bin/dropdb c_planning_db
/usr/local/opt/postgresql@16/bin/createdb c_planning_db

# Re-seed data
cd ~/c-planning-dashboard/backend
python3 seed_data.py
```

## 📝 API Documentation

Access interactive API docs at: **http://localhost:3001/docs**

Available endpoints:
- `GET /api/initiatives/` - List all initiatives
- `POST /api/initiatives/` - Create new initiative
- `PUT /api/initiatives/{id}` - Update initiative
- `DELETE /api/initiatives/{id}` - Delete initiative
- `PATCH /api/initiatives/reorder` - Reorder initiatives

## 🎨 Color Palette (Falabella)

- **Primary Green**: #00A651
- **Secondary Orange**: #FF6B00
- **Blue**: #0033A0
- **Red**: #E31E24

## 📚 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Material-UI + AG Grid
- **Backend**: FastAPI + SQLAlchemy
- **Database**: PostgreSQL (c_planning_db)
- **State Management**: React Query

---

**Need help?** Check the main README.md for detailed documentation.
