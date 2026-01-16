#!/bin/bash

echo "🚀 Iniciando deployment automático..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar autenticación
echo "📋 Verificando autenticaciones..."
if ! railway whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ No estás autenticado en Railway${NC}"
    echo "Por favor ejecuta: railway login"
    exit 1
fi

if ! vercel whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ No estás autenticado en Vercel${NC}"
    echo "Por favor ejecuta: vercel login"
    exit 1
fi

echo -e "${GREEN}✅ Autenticaciones verificadas${NC}"
echo ""

# Deploy Frontend en Vercel
echo "📦 Desplegando Frontend en Vercel..."
cd frontend

# Crear proyecto en Vercel sin preguntas
vercel --yes --prod --name c-planning-dashboard 2>&1 | tee /tmp/vercel-output.txt

# Obtener URL de Vercel
VERCEL_URL=$(grep -o 'https://[^ ]*vercel.app' /tmp/vercel-output.txt | head -1)

if [ -z "$VERCEL_URL" ]; then
    echo -e "${YELLOW}⚠️  No se pudo obtener la URL de Vercel automáticamente${NC}"
    echo "Por favor ve a https://vercel.com y copia la URL de tu proyecto"
    read -p "Pega la URL de Vercel aquí: " VERCEL_URL
fi

echo -e "${GREEN}✅ Frontend desplegado en: $VERCEL_URL${NC}"
echo ""

cd ..

# Mensaje final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETADO${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Próximos pasos MANUALES (necesarios):"
echo ""
echo "1️⃣  Railway Backend:"
echo "   Ve a: https://railway.com/project/f2a83af9-4791-4dd0-aaaa-9d09423e09a9"
echo "   • Click '+ New' → 'GitHub Repo'"
echo "   • Selecciona 'c-planning-dashboard'"
echo "   • En Settings → Root Directory: 'backend'"
echo "   • Click '+ New' → 'Database' → 'PostgreSQL'"
echo "   • Espera el deploy y copia la URL del backend"
echo ""
echo "2️⃣  Actualizar variables de entorno:"
echo "   Railway:"
echo "   • Variables → ALLOWED_ORIGINS=$VERCEL_URL"
echo ""
echo "   Vercel:"
echo "   • Ve a tu proyecto → Settings → Environment Variables"
echo "   • Agrega: VITE_API_URL=[URL_DE_TU_BACKEND_RAILWAY]"
echo "   • Redeploy desde Deployments"
echo ""
echo "3️⃣  Tu aplicación estará lista en:"
echo "   Frontend: $VERCEL_URL"
echo "   Backend: [URL que obtengas de Railway]"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
