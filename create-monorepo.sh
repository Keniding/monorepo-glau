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

log "🚀 Iniciando construcción automatizada del monorepo (MEJORADO)..."

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

# 2. CREAR APLICACIONES REMOTES
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

# 3. CREAR LIBRERÍAS SHARED CON NOMBRES ÚNICOS
log "📚 Creando librerías shared..."

# UI Kit
info "Creando Shared UI Kit..."
$NX_PATH g @nx/angular:library \
  --name=shared-uikit \
  --directory=libs/shared/uikit \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Core
info "Creando Shared Core..."
$NX_PATH g @nx/angular:library \
  --name=shared-core \
  --directory=libs/shared/core \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Data Access
info "Creando Shared Data Access..."
$NX_PATH g @nx/angular:library \
  --name=shared-dataaccess \
  --directory=libs/shared/dataaccess \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Feature Plugins
info "Creando Shared Feature Plugins..."
$NX_PATH g @nx/angular:library \
  --name=shared-featureplugins \
  --directory=libs/shared/featureplugins \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 4. CREAR LIBRERÍAS DOMAIN CON NOMBRES ÚNICOS
log "🏗️ Creando librerías de dominio..."

# Medical Domain
info "Creando Medical Domain..."
$NX_PATH g @nx/angular:library \
  --name=domain-medical \
  --directory=libs/domain/medical \
  --buildable=true \
  --publishable=false \
  --no-interactive

# User Domain
info "Creando User Domain..."
$NX_PATH g @nx/angular:library \
  --name=domain-user \
  --directory=libs/domain/user \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Shared Kernel
info "Creando Domain Shared Kernel..."
$NX_PATH g @nx/angular:library \
  --name=domain-sharedkernel \
  --directory=libs/domain/sharedkernel \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 5. CREAR LIBRERÍAS APPLICATION CON NOMBRES ÚNICOS
log "⚙️ Creando librerías de aplicación..."

# Use Cases
info "Creando Application Use Cases..."
$NX_PATH g @nx/angular:library \
  --name=application-usecases \
  --directory=libs/application/usecases \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Services
info "Creando Application Services..."
$NX_PATH g @nx/angular:library \
  --name=application-services \
  --directory=libs/application/services \
  --buildable=true \
  --publishable=false \
  --no-interactive

# 6. CREAR LIBRERÍAS INFRASTRUCTURE CON NOMBRES ÚNICOS
log "🔧 Creando librerías de infraestructura..."

# PrimeNG Adapter
info "Creando PrimeNG Adapter..."
$NX_PATH g @nx/angular:library \
  --name=infrastructure-primengadapter \
  --directory=libs/infrastructure/primengadapter \
  --buildable=true \
  --publishable=false \
  --no-interactive

# API Adapter
info "Creando API Adapter..."
$NX_PATH g @nx/angular:library \
  --name=infrastructure-apiadapter \
  --directory=libs/infrastructure/apiadapter \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Storage Adapter
info "Creando Storage Adapter..."
$NX_PATH g @nx/angular:library \
  --name=infrastructure-storageadapter \
  --directory=libs/infrastructure/storageadapter \
  --buildable=true \
  --publishable=false \
  --no-interactive

# Notification Adapter
info "Creando Notification Adapter..."
$NX_PATH g @nx/angular:library \
  --name=infrastructure-notificationadapter \
  --directory=libs/infrastructure/notificationadapter \
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

# Crear directorios para librerías shared
mkdir -p libs/shared/uikit/src/lib/{components,tokens,themes,layouts,primitives}
mkdir -p libs/shared/core/src/lib/{base,interfaces,models,types,utils,constants}
mkdir -p libs/shared/dataaccess/src/lib/{base,adapters,repositories,state,cache}
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

# 10. CREAR ARCHIVOS BARREL EXPORTS
log "📦 Creando barrel exports..."

# Crear barrel exports para librerías shared
info "Creando barrel exports para shared..."
cat > libs/shared/uikit/src/index.ts << 'EOF'
export * from './lib/shared-uikit.module';
export * from './lib/components';
export * from './lib/tokens';
export * from './lib/themes';
export * from './lib/layouts';
export * from './lib/primitives';
EOF

cat > libs/shared/core/src/index.ts << 'EOF'
export * from './lib/shared-core.module';
export * from './lib/base';
export * from './lib/interfaces';
export * from './lib/models';
export * from './lib/types';
export * from './lib/utils';
export * from './lib/constants';
EOF

cat > libs/shared/dataaccess/src/index.ts << 'EOF'
export * from './lib/shared-dataaccess.module';
export * from './lib/base';
export * from './lib/adapters';
export * from './lib/repositories';
export * from './lib/state';
export * from './lib/cache';
EOF

cat > libs/shared/featureplugins/src/index.ts << 'EOF'
export * from './lib/shared-featureplugins.module';
export * from './lib/core';
export * from './lib/blocks';
export * from './lib/schemas';
export * from './lib/builders';
EOF

# Crear barrel exports para librerías domain
info "Creando barrel exports para domain..."
cat > libs/domain/medical/src/index.ts << 'EOF'
export * from './lib/domain-medical.module';
export * from './lib/entities';
export * from './lib/valueobjects';
export * from './lib/aggregates';
export * from './lib/services';
export * from './lib/events';
export * from './lib/ports';
EOF

cat > libs/domain/user/src/index.ts << 'EOF'
export * from './lib/domain-user.module';
export * from './lib/entities';
export * from './lib/valueobjects';
export * from './lib/aggregates';
export * from './lib/services';
export * from './lib/events';
export * from './lib/ports';
EOF

cat > libs/domain/sharedkernel/src/index.ts << 'EOF'
export * from './lib/domain-sharedkernel.module';
export * from './lib/entities';
export * from './lib/valueobjects';
export * from './lib/aggregates';
export * from './lib/services';
export * from './lib/events';
export * from './lib/ports';
EOF

# Crear barrel exports para librerías application
info "Creando barrel exports para application..."
cat > libs/application/usecases/src/index.ts << 'EOF'
export * from './lib/application-usecases.module';
export * from './lib/medical';
export * from './lib/user';
export * from './lib/shared';
EOF

cat > libs/application/services/src/index.ts << 'EOF'
export * from './lib/application-services.module';
export * from './lib/orchestrators';
export * from './lib/coordinators';
export * from './lib/handlers';
EOF

# Crear barrel exports para librerías infrastructure
info "Creando barrel exports para infrastructure..."
cat > libs/infrastructure/primengadapter/src/index.ts << 'EOF'
export * from './lib/infrastructure-primengadapter.module';
export * from './lib/components';
export * from './lib/factories';
export * from './lib/transformers';
export * from './lib/skeleton';
export * from './lib/themes';
EOF

cat > libs/infrastructure/apiadapter/src/index.ts << 'EOF'
export * from './lib/infrastructure-apiadapter.module';
export * from './lib/clients';
export * from './lib/interceptors';
export * from './lib/models';
export * from './lib/mappers';
EOF

cat > libs/infrastructure/storageadapter/src/index.ts << 'EOF'
export * from './lib/infrastructure-storageadapter.module';
export * from './lib/providers';
export * from './lib/models';
export * from './lib/strategies';
EOF

cat > libs/infrastructure/notificationadapter/src/index.ts << 'EOF'
export * from './lib/infrastructure-notificationadapter.module';
export * from './lib/providers';
export * from './lib/models';
export * from './lib/strategies';
EOF

log "✅ ¡Estructura del monorepo creada exitosamente!"
info "📋 Resumen de lo creado:"
echo "  📱 Aplicaciones:"
echo "    - Shell Host (apps/hosts/shell)"
echo "    - Dashboard MFE (apps/remotes/dashboard)"
echo "    - Medical MFE (apps/remotes/medical)"
echo "    - Admin MFE (apps/remotes/admin)"
echo ""
echo "  📚 Librerías Shared:"
echo "    - UI Kit (libs/shared/uikit) → shared-uikit"
echo "    - Core (libs/shared/core) → shared-core"
echo "    - Data Access (libs/shared/dataaccess) → shared-dataaccess"
echo "    - Feature Plugins (libs/shared/featureplugins) → shared-featureplugins"
echo ""
echo "  🏗️ Librerías Domain:"
echo "    - Medical (libs/domain/medical) → domain-medical"
echo "    - User (libs/domain/user) → domain-user"
echo "    - Shared Kernel (libs/domain/sharedkernel) → domain-sharedkernel"
echo ""
echo "  ⚙️ Librerías Application:"
echo "    - Use Cases (libs/application/usecases) → application-usecases"
echo "    - Services (libs/application/services) → application-services"
echo ""
echo "  🔧 Librerías Infrastructure:"
echo "    - PrimeNG Adapter (libs/infrastructure/primengadapter) → infrastructure-primengadapter"
echo "    - API Adapter (libs/infrastructure/apiadapter) → infrastructure-apiadapter"
echo "    - Storage Adapter (libs/infrastructure/storageadapter) → infrastructure-storageadapter"
echo "    - Notification Adapter (libs/infrastructure/notificationadapter) → infrastructure-notificationadapter"

warning "⚠️ Próximos pasos recomendados:"
echo "  1. Verificar las dependencias en tsconfig.base.json"
echo "  2. Configurar Module Federation en webpack.config.ts"
echo "  3. Implementar los módulos Angular en cada librería"
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
echo "  # Build librerías:"
echo "  nx build shared-uikit"
echo "  nx build shared-core"
echo "  nx build domain-medical"
echo ""
echo "  # Ver el gráfico de dependencias:"
echo "  nx graph"
echo ""
echo "  # Ejecutar tests:"
echo "  nx test shell"
echo "  nx lint shell"

info "📝 Nombres de librerías para importar:"
echo "  @glau/shared-uikit"
echo "  @glau/shared-core"
echo "  @glau/shared-dataaccess"
echo "  @glau/shared-featureplugins"
echo "  @glau/domain-medical"
echo "  @glau/domain-user"
echo "  @glau/domain-sharedkernel"
echo "  @glau/application-usecases"
echo "  @glau/application-services"
echo "  @glau/infrastructure-primengadapter"
echo "  @glau/infrastructure-apiadapter"
echo "  @glau/infrastructure-storageadapter"
echo "  @glau/infrastructure-notificationadapter"

# Dale permisos de ejecución: chmod +x create-monorepo.sh
# Ejecuta: ./create-monorepo.sh
