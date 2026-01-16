#!/bin/bash

echo "🛑 Stopping C-Planning Dashboard Services..."
echo ""

# Detener backend
echo "Stopping backend..."
pkill -f "python3.*c-planning-dashboard/backend/main.py"

# Detener frontend
echo "Stopping frontend..."
pkill -f "vite.*5174"

echo ""
echo "✅ All services stopped"
echo ""
echo "To start again, run: ./start-dev.sh"
