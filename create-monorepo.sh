#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
  echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
  echo -e "${RED}[ERROR] $1${NC}"
}

warning() {
  echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
  echo -e "${BLUE}[INFO] $1${NC}"
}

# Variables
NX_PATH="./node_modules/.bin/nx.exe"
# shellcheck disable=SC2034
BASE_DIR=$(pwd)

# Verificar que estamos en el directorio correcto
if [ ! -f "nx.json" ]; then
  error "No se encontró nx.json. Asegúrate de estar en la raíz del monorepo."
  exit 1
fi

log "🚀 Iniciando construcción automatizada del monorepo..."

# 1. CREAR APLICACIÓN HOST PRIMERO
log "🏠 Creando aplicación Shell Host..."

info "Creando Shell Host..."
$NX_PATH g @nx/angular:host \
  --directory=apps/hosts/shell \
  --name=shell \
  --addTailwind=true \
  --e2eTestRunner=none \
  --style=scss \
  --unitTestRunner=none \
  --no-interactive

# 2. CREAR APLICACIONES REMOTES (DESPUÉS DEL HOST)
log "📱 Creando aplicaciones remotas..."

# Dashboard MFE
info "Creando Dashboard MFE..."
$NX_PATH g @nx/angular:remote \
  --directory=apps/remotes/dashboard \
  --name=dashboard \
  --host=shell \
  --addTailwind=true \
  --e2eTestRunner=none \
  --style=scss \
  --unitTestRunner=none \
  --no-interactive

# Medical MFE
info "Creando Medical MFE..."
$NX_PATH g @nx/angular:remote \
  --directory=apps/remotes/medical \
  --name=medical \
  --host=shell \
  --addTailwind=true \
  --e2eTestRunner=none \
  --style=scss \
  --unitTestRunner=none \
  --no-interactive

# Admin MFE
info "Creando Admin MFE..."
$NX_PATH g @nx/angular:remote \
  --directory=apps/remotes/admin \
  --name=admin \
  --host=shell \
  --addTailwind=true \
  --e2eTestRunner=none \
  --style=scss \
  --unitTestRunner=none \
  --no-interactive

# 3. CREAR LIBRERÍAS SHARED
log "📚 Creando librerías shared..."

# UI Kit
info "Creando UI Kit..."
$NX_PATH g @nx/angular:library \
  --name=uikit \
  --directory=libs/shared \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Core
info "Creando Core..."
$NX_PATH g @nx/angular:library \
  --name=core \
  --directory=libs/shared \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Data Access
info "Creando Data Access..."
$NX_PATH g @nx/angular:library \
  --name=dataaccess \
  --directory=libs/shared \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Feature Plugins
info "Creando Feature Plugins..."
$NX_PATH g @nx/angular:library \
  --name=featureplugins \
  --directory=libs/shared \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 4. CREAR LIBRERÍAS DOMAIN
log "🏗️ Creando librerías de dominio..."

# Medical Domain
info "Creando Medical Domain..."
$NX_PATH g @nx/angular:library \
  --name=medical \
  --directory=libs/domain \
  --buildable=true \
  --publishable=false \
  --no-interactive

# User Domain
info "Creando User Domain..."
$NX_PATH g @nx/angular:library \
  --name=user \
  --directory=libs/domain \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Shared Kernel
info "Creando Shared Kernel..."
$NX_PATH g @nx/angular:library \
  --name=sharedkernel \
  --directory=libs/domain \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 5. CREAR LIBRERÍAS APPLICATION
log "⚙️ Creando librerías de aplicación..."

# Use Cases
info "Creando Use Cases..."
$NX_PATH g @nx/angular:library \
  --name=usecases \
  --directory=libs/application \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Services
info "Creando Application Services..."
$NX_PATH g @nx/angular:library \
  --name=services \
  --directory=libs/application \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 6. CREAR LIBRERÍAS INFRASTRUCTURE
log "🔧 Creando librerías de infraestructura..."

# PrimeNG Adapter
info "Creando PrimeNG Adapter..."
$NX_PATH g @nx/angular:library \
  --name=primengadapter \
  --directory=libs/infrastructure \
  --buildable=true \
  --publishable=false \
  --no-interactive

# API Adapter
info "Creando API Adapter..."
$NX_PATH g @nx/angular:library \
  --name=apiadapter \
  --directory=libs/infrastructure \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Storage Adapter
info "Creando Storage Adapter..."
$NX_PATH g @nx/angular:library \
  --name=storageadapter \
  --directory=libs/infrastructure \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Notification Adapter
info "Creando Notification Adapter..."
$NX_PATH g @nx/angular:library \
  --name=notificationadapter \
  --directory=libs/infrastructure \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 7. CREAR ESTRUCTURA DE DIRECTORIOS ADICIONALES
log "📁 Creando estructura de directorios..."

# Crear directorios para Shell
mkdir -p apps/hosts/shell/src/app/core/{services,guards,interceptors,providers}
mkdir -p apps/hosts/shell/src/app/shared
mkdir -p apps/hosts/shell/src/app/layout/{components,services,models}
mkdir -p apps/hosts/shell/src/app/routing
mkdir -p apps/hosts/shell/src/app/blocks

# Crear directorios para MFEs
mkdir -p apps/remotes/dashboard/src/app/{features,shared,core}
mkdir -p apps/remotes/medical/src/app/{features,shared,core}
mkdir -p apps/remotes/admin/src/app/{features,shared,core}

# Crear directorios para UI Kit
mkdir -p libs/shared/uikit/src/lib/{components,tokens,themes,layouts,primitives}

# Crear directorios para Core
mkdir -p libs/shared/core/src/lib/{base,interfaces,models,types,utils,constants}

# Crear directorios para Data Access
mkdir -p libs/shared/dataaccess/src/lib/{base,adapters,repositories,state,cache}

# Crear directorios para Feature Plugins
mkdir -p libs/shared/featureplugins/src/lib/core/{engine,registry,loader,factory,decorators}
mkdir -p libs/shared/featureplugins/src/lib/blocks/{layoutblocks,contentblocks,widgetblocks,formblocks}
mkdir -p libs/shared/featureplugins/src/lib/schemas/{blockschemas,layoutschemas,validation}
mkdir -p libs/shared/featureplugins/src/lib/builders

# Crear directorios para dominios
mkdir -p libs/domain/medical/src/lib/{entities,valueobjects,aggregates,services,events,ports}
mkdir -p libs/domain/user/src/lib/{entities,valueobjects,aggregates,services,events,ports}
mkdir -p libs/domain/sharedkernel/src/lib/{entities,valueobjects,aggregates,services,events,ports}

# Crear directorios para application
mkdir -p libs/application/usecases/src/lib/{medical,user,shared}
mkdir -p libs/application/services/src/lib/{orchestrators,coordinators,handlers}

# Crear directorios para infrastructure
mkdir -p libs/infrastructure/primengadapter/src/lib/{components,factories,transformers,skeleton,themes}
mkdir -p libs/infrastructure/apiadapter/src/lib/{clients,interceptors,models,mappers}
mkdir -p libs/infrastructure/storageadapter/src/lib/{providers,models,strategies}
mkdir -p libs/infrastructure/notificationadapter/src/lib/{providers,models,strategies}

# Crear directorios de tools
mkdir -p tools/{generators,executors,scripts}
mkdir -p tools/generators/{blockgenerator,mfegenerator,domaingenerator}

# Crear directorios de configs
mkdir -p configs/{webpack,eslint,jest}

# 8. CREAR COMPONENTES Y SERVICIOS BÁSICOS PARA SHELL
log "🧩 Creando componentes y servicios básicos..."

# Layout components
info "Creando componentes de layout..."
$NX_PATH g @schematics/angular:component \
  --name=mainlayout \
  --project=shell \
  --path=apps/hosts/shell/src/app/layout/components \
  --no-interactive

$NX_PATH g @schematics/angular:component \
  --name=header \
  --project=shell \
  --path=apps/hosts/shell/src/app/layout/components \
  --no-interactive

$NX_PATH g @schematics/angular:component \
  --name=sidebar \
  --project=shell \
  --path=apps/hosts/shell/src/app/layout/components \
  --no-interactive

$NX_PATH g @schematics/angular:component \
  --name=footer \
  --project=shell \
  --path=apps/hosts/shell/src/app/layout/components \
  --no-interactive

# Core services
info "Creando servicios core..."
$NX_PATH g @schematics/angular:service \
  --name=auth \
  --project=shell \
  --path=apps/hosts/shell/src/app/core/services \
  --no-interactive

$NX_PATH g @schematics/angular:service \
  --name=layout \
  --project=shell \
  --path=apps/hosts/shell/src/app/layout/services \
  --no-interactive

$NX_PATH g @schematics/angular:service \
  --name=blockorchestrator \
  --project=shell \
  --path=apps/hosts/shell/src/app/blocks \
  --no-interactive

# Guards
info "Creando guards..."
$NX_PATH g @schematics/angular:guard \
  --name=auth \
  --project=shell \
  --path=apps/hosts/shell/src/app/core/guards \
  --no-interactive

# Interceptors
info "Creando interceptors..."
$NX_PATH g @schematics/angular:interceptor \
  --name=auth \
  --project=shell \
  --path=apps/hosts/shell/src/app/core/interceptors \
  --no-interactive

# 9. CREAR COMPONENTES BÁSICOS PARA MFEs
log "🎯 Creando componentes básicos para MFEs..."

# Dashboard MFE
info "Creando componentes para Dashboard MFE..."
$NX_PATH g @schematics/angular:component \
  --name=dashboardhome \
  --project=dashboard \
  --path=apps/remotes/dashboard/src/app/features \
  --no-interactive

# Medical MFE
info "Creando componentes para Medical MFE..."
$NX_PATH g @schematics/angular:component \
  --name=medicalhome \
  --project=medical \
  --path=apps/remotes/medical/src/app/features \
  --no-interactive

# Admin MFE
info "Creando componentes para Admin MFE..."
$NX_PATH g @schematics/angular:component \
  --name=adminhome \
  --project=admin \
  --path=apps/remotes/admin/src/app/features \
  --no-interactive

log "✅ ¡Estructura del monorepo creada exitosamente!"
info "📋 Resumen de lo creado:"
echo "  📱 Aplicaciones:"
echo "    - Shell Host (apps/hosts/shell)"
echo "    - Dashboard MFE (apps/remotes/dashboard)"
echo "    - Medical MFE (apps/remotes/medical)"
echo "    - Admin MFE (apps/remotes/admin)"
echo ""
echo "  📚 Librerías Shared:"
echo "    - UI Kit (libs/shared/uikit)"
echo "    - Core (libs/shared/core)"
echo "    - Data Access (libs/shared/dataaccess)"
echo "    - Feature Plugins (libs/shared/featureplugins)"
echo ""
echo "  🏗️ Librerías Domain:"
echo "    - Medical (libs/domain/medical)"
echo "    - User (libs/domain/user)"
echo "    - Shared Kernel (libs/domain/sharedkernel)"
echo ""
echo "  ⚙️ Librerías Application:"
echo "    - Use Cases (libs/application/usecases)"
echo "    - Services (libs/application/services)"
echo ""
echo "  🔧 Librerías Infrastructure:"
echo "    - PrimeNG Adapter (libs/infrastructure/primengadapter)"
echo "    - API Adapter (libs/infrastructure/apiadapter)"
echo "    - Storage Adapter (libs/infrastructure/storageadapter)"
echo "    - Notification Adapter (libs/infrastructure/notificationadapter)"

warning "⚠️ Próximos pasos recomendados:"
echo "  1. Configurar las dependencias entre librerías en tsconfig.base.json"
echo "  2. Configurar Module Federation en webpack.config.ts"
echo "  3. Implementar los barrel exports en cada librería"
echo "  4. Configurar el routing para los MFEs"
echo "  5. Implementar el sistema de plugins y blocks"
echo "  6. Instalar dependencias adicionales (PrimeNG, etc.)"

log "🎉 ¡Automatización completada!"

# Mostrar comandos útiles
info "🚀 Comandos útiles para desarrollo:"
echo "  # Servir todas las aplicaciones:"
echo "  nx serve shell"
echo "  nx serve dashboard"
echo "  nx serve medical"
echo "  nx serve admin"
echo ""
echo "  # Build todas las aplicaciones:"
echo "  nx build shell"
echo "  nx build dashboard"
echo "  nx build medical"
echo "  nx build admin"
echo ""
echo "  # Ver el gráfico de dependencias:"
echo "  nx graph"
echo ""
echo "  # Ejecutar tests:"
echo "  nx test shell"
echo "  nx lint shell"

# Dale permisos de ejecución: chmod +x create-monorepo.sh
# Ejecuta: ./create-monorepo.sh
