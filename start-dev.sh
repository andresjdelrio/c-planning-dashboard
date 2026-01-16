#!/bin/bash

echo "🚀 Starting C-Planning Dashboard"
echo ""

# Verificar PostgreSQL
if ! pgrep -f postgres > /dev/null; then
    echo "⚠️  PostgreSQL no está corriendo. Iniciando..."
    brew services start postgresql@16
    sleep 2
fi
echo "✓ PostgreSQL corriendo"
echo ""

# Iniciar backend
echo "🔧 Iniciando backend (FastAPI en puerto 3001)..."
cd ~/c-planning-dashboard/backend
python3 main.py > /tmp/c-planning-backend.log 2>&1 &
BACKEND_PID=$!
echo "  Backend PID: $BACKEND_PID"
echo "  Logs: tail -f /tmp/c-planning-backend.log"

sleep 3

# Iniciar frontend
echo ""
echo "🎨 Iniciando frontend (React en puerto 5174)..."
cd ~/c-planning-dashboard/frontend
npm run dev > /tmp/c-planning-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "  Frontend PID: $FRONTEND_PID"
echo "  Logs: tail -f /tmp/c-planning-frontend.log"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ C-Planning Dashboard iniciado"
echo ""
echo "📊 Backend API:  http://localhost:3001"
echo "   Health check: http://localhost:3001/health"
echo "   API docs:     http://localhost:3001/docs"
echo ""
echo "🌐 Frontend:     http://localhost:5174"
echo ""
echo "📝 Para detener: kill $BACKEND_PID $FRONTEND_PID"
echo "   O ejecuta: pkill -f 'python3.*c-planning' && pkill -f 'vite.*5174'"
echo ""
echo "📋 Ver logs en tiempo real:"
echo "   Backend:  tail -f /tmp/c-planning-backend.log"
echo "   Frontend: tail -f /tmp/c-planning-frontend.log"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

wait
