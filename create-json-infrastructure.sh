#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

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

success() {
  echo -e "${CYAN}[SUCCESS] $1${NC}"
}

debug() {
  echo -e "${PURPLE}[DEBUG] $1${NC}"
}

# Variables
NX_PATH="./node_modules/.bin/nx.exe"
CONFIG_FILE="monorepo-infrastructure.json"

# Arrays para tracking
declare -A CREATED_HOSTS
declare -A CREATED_REMOTES
declare -A CREATED_LIBRARIES

# Verificaciones iniciales
if [ ! -f "nx.json" ]; then
  error "No se encontró nx.json. Asegúrate de estar en la raíz del monorepo."
  exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
  error "No se encontró el archivo de configuración: $CONFIG_FILE"
  exit 1
fi

if ! command -v jq &> /dev/null; then
  error "jq no está disponible. Este script requiere jq para funcionar."
  exit 1
fi

log "🚀 Iniciando construcción COMPLETA con JSON Infrastructure + Dependencias..."

# Función para crear hosts
create_hosts() {
  log "🏠 Creando aplicaciones Host..."

  local hosts_count=$(jq -r '.applications.hosts | length' "$CONFIG_FILE")
  info "Total hosts a crear: $hosts_count"

  for ((i=0; i<hosts_count; i++)); do
      local name=$(jq -r ".applications.hosts[$i].name" "$CONFIG_FILE")
      local directory=$(jq -r ".applications.hosts[$i].directory" "$CONFIG_FILE")

      if [ -d "$directory" ]; then
          warning "⚠️ Host '$name' ya existe, procesando elementos..."
          CREATED_HOSTS[$name]=1
      else
          info "Creando Host: $name en $directory"

          local addTailwind=$(jq -r ".applications.hosts[$i].config.addTailwind" "$CONFIG_FILE")
          local style=$(jq -r ".applications.hosts[$i].config.style" "$CONFIG_FILE")

          $NX_PATH g @nx/angular:host \
              --directory="$directory" \
              --name="$name" \
              --addTailwind="$addTailwind" \
              --e2eTestRunner=none \
              --style="$style" \
              --unitTestRunner=none \
              --no-interactive

          if [ $? -eq 0 ]; then
              success "✅ Host '$name' creado exitosamente"
              CREATED_HOSTS[$name]=1
          else
              error "❌ Error creando host '$name'"
              continue
          fi
      fi

      # Crear elementos del host
      create_host_elements "$i"
  done
}

# Función para crear elementos del host
create_host_elements() {
  local host_index="$1"
  local name=$(jq -r ".applications.hosts[$host_index].name" "$CONFIG_FILE")
  local directory=$(jq -r ".applications.hosts[$host_index].directory" "$CONFIG_FILE")

  debug "Procesando elementos para host: $name"

  # Crear directorios
  local dirs=$(jq -r ".applications.hosts[$host_index].directories[]" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$dirs" ]; then
      while IFS= read -r dir; do
          mkdir -p "$directory/$dir"
          debug "  📁 Creado: $directory/$dir"
      done <<< "$dirs"
  fi

  # Crear componentes
  local components=$(jq -c ".applications.hosts[$host_index].components[]?" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$components" ]; then
      debug "Creando componentes para host: $name"
      while IFS= read -r comp; do
          local comp_name=$(echo "$comp" | jq -r '.name')
          local comp_path=$(echo "$comp" | jq -r '.path')

          debug "  🧩 Creando componente: $comp_name en $comp_path"

          $NX_PATH g @schematics/angular:component \
              --name="$comp_name" \
              --project="$name" \
              --path="$directory/$comp_path" \
              --no-interactive
      done <<< "$components"
  fi

  # Crear servicios
  local services=$(jq -c ".applications.hosts[$host_index].services[]?" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$services" ]; then
      debug "Creando servicios para host: $name"
      while IFS= read -r service; do
          local service_name=$(echo "$service" | jq -r '.name')
          local service_path=$(echo "$service" | jq -r '.path')

          debug "  ⚙️ Creando servicio: $service_name en $service_path"

          $NX_PATH g @schematics/angular:service \
              --name="$service_name" \
              --project="$name" \
              --path="$directory/$service_path" \
              --no-interactive
      done <<< "$services"
  fi

  # Crear guards
  local guards=$(jq -c ".applications.hosts[$host_index].guards[]?" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$guards" ]; then
      debug "Creando guards para host: $name"
      while IFS= read -r guard; do
          local guard_name=$(echo "$guard" | jq -r '.name')
          local guard_path=$(echo "$guard" | jq -r '.path')

          debug "  🛡️ Creando guard: $guard_name en $guard_path"

          $NX_PATH g @schematics/angular:guard \
              --name="$guard_name" \
              --project="$name" \
              --path="$directory/$guard_path" \
              --no-interactive
      done <<< "$guards"
  fi

  # Crear interceptors
  local interceptors=$(jq -c ".applications.hosts[$host_index].interceptors[]?" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$interceptors" ]; then
      debug "Creando interceptors para host: $name"
      while IFS= read -r interceptor; do
          local interceptor_name=$(echo "$interceptor" | jq -r '.name')
          local interceptor_path=$(echo "$interceptor" | jq -r '.path')

          debug "  🔄 Creando interceptor: $interceptor_name en $interceptor_path"

          $NX_PATH g @schematics/angular:interceptor \
              --name="$interceptor_name" \
              --project="$name" \
              --path="$directory/$interceptor_path" \
              --no-interactive
      done <<< "$interceptors"
  fi
}

# Función para crear remotes
create_remotes() {
  log "📱 Creando aplicaciones Remote..."

  local remotes_count=$(jq -r '.applications.remotes | length' "$CONFIG_FILE")
  info "Total remotes a crear: $remotes_count"

  for ((i=0; i<remotes_count; i++)); do
      local name=$(jq -r ".applications.remotes[$i].name" "$CONFIG_FILE")
      local directory=$(jq -r ".applications.remotes[$i].directory" "$CONFIG_FILE")
      local host=$(jq -r ".applications.remotes[$i].host" "$CONFIG_FILE")

      if [[ -n "${CREATED_REMOTES[$name]}" ]]; then
          warning "⚠️ Remote '$name' ya fue procesado, saltando..."
          continue
      fi

      if [ -d "$directory" ]; then
          warning "⚠️ Remote '$name' ya existe, procesando elementos..."
          CREATED_REMOTES[$name]=1
      else
          info "Creando Remote: $name en $directory (host: $host)"

          local addTailwind=$(jq -r ".applications.remotes[$i].config.addTailwind" "$CONFIG_FILE")
          local style=$(jq -r ".applications.remotes[$i].config.style" "$CONFIG_FILE")

          $NX_PATH g @nx/angular:remote \
              --directory="$directory" \
              --name="$name" \
              --host="$host" \
              --addTailwind="$addTailwind" \
              --e2eTestRunner=none \
              --style="$style" \
              --unitTestRunner=none \
              --no-interactive

          if [ $? -eq 0 ]; then
              success "✅ Remote '$name' creado exitosamente"
              CREATED_REMOTES[$name]=1
          else
              error "❌ Error creando remote '$name'"
              continue
          fi
      fi

      # Crear elementos del remote
      create_remote_elements "$i"
  done
}

# Función para crear elementos del remote
create_remote_elements() {
  local remote_index="$1"
  local name=$(jq -r ".applications.remotes[$remote_index].name" "$CONFIG_FILE")
  local directory=$(jq -r ".applications.remotes[$remote_index].directory" "$CONFIG_FILE")

  debug "Procesando elementos para remote: $name"

  # Crear directorios
  local dirs=$(jq -r ".applications.remotes[$remote_index].directories[]" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$dirs" ]; then
      while IFS= read -r dir; do
          mkdir -p "$directory/$dir"
          debug "  📁 Creado: $directory/$dir"
      done <<< "$dirs"
  fi

  # Crear componentes
  local components=$(jq -c ".applications.remotes[$remote_index].components[]?" "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$components" ]; then
      debug "Creando componentes para remote: $name"
      while IFS= read -r comp; do
          local comp_name=$(echo "$comp" | jq -r '.name')
          local comp_path=$(echo "$comp" | jq -r '.path')

          debug "  🧩 Creando componente: $comp_name en $comp_path"

          $NX_PATH g @schematics/angular:component \
              --name="$comp_name" \
              --project="$name" \
              --path="$directory/$comp_path" \
              --no-interactive
      done <<< "$components"
  fi
}

# Función para crear librerías
create_libraries() {
  log "📚 Creando librerías..."

  for category in shared domain application infrastructure; do
      info "Procesando categoría: $category"

      local libs=$(jq -c ".libraries.$category.libraries[]" "$CONFIG_FILE" 2>/dev/null)
      if [ -n "$libs" ]; then
          while IFS= read -r lib; do
              local name=$(echo "$lib" | jq -r '.name')
              local displayName=$(echo "$lib" | jq -r '.displayName')
              local directory=$(echo "$lib" | jq -r '.directory')
              local buildable=$(echo "$lib" | jq -r '.config.buildable')
              local publishable=$(echo "$lib" | jq -r '.config.publishable')

              if [[ -n "${CREATED_LIBRARIES[$name]}" ]]; then
                  warning "⚠️ Librería '$name' ya fue procesada, saltando..."
                  continue
              fi

              if [ -d "$directory" ]; then
                  warning "⚠️ Librería '$name' ya existe, procesando elementos..."
                  CREATED_LIBRARIES[$name]=1
              else
                  info "  Creando librería: $displayName ($name)"

                  $NX_PATH g @nx/angular:library \
                      --name="$name" \
                      --directory="$directory" \
                      --buildable="$buildable" \
                      --publishable="$publishable" \
                      --no-interactive

                  if [ $? -eq 0 ]; then
                      success "  ✅ Librería '$displayName' creada exitosamente"
                      CREATED_LIBRARIES[$name]=1
                  else
                      error "  ❌ Error creando librería '$displayName'"
                      continue
                  fi
              fi

              # Crear elementos de la librería
              create_library_elements "$lib" "$directory"
          done <<< "$libs"
      fi
  done
}

# Función para crear elementos de librería
create_library_elements() {
  local lib_json="$1"
  local directory="$2"
  local name=$(echo "$lib_json" | jq -r '.name')

  debug "Procesando elementos para librería: $name"

  # Crear directorios
  local dirs=$(echo "$lib_json" | jq -r '.directories[]' 2>/dev/null)
  if [ -n "$dirs" ]; then
      while IFS= read -r dir; do
          mkdir -p "$directory/$dir"
          debug "  📁 Creado: $directory/$dir"
      done <<< "$dirs"
  fi

  # Crear barrel exports
  if [ -d "$directory/src" ]; then
      local index_file="$directory/src/index.ts"
      cat > "$index_file" << EOF
// Auto-generated barrel export for $name
export * from './lib/$name';
EOF

      local exports=$(echo "$lib_json" | jq -r '.exports[]?' 2>/dev/null)
      if [ -n "$exports" ]; then
          while IFS= read -r export_name; do
              echo "export * from './lib/$export_name';" >> "$index_file"
          done <<< "$exports"
      fi

      debug "  📦 Barrel export creado: $index_file"
  fi
}

# NUEVA FUNCIÓN: Crear dependencias reales entre librerías
create_library_dependencies() {
  log "🔗 Creando dependencias entre librerías..."

  # 1. Shared Core - Base entities
  info "📦 Creando Shared Core base..."
  cat > libs/shared/core/src/lib/base/base.entity.ts << 'EOF'
export abstract class BaseEntity<T = string> {
  constructor(public readonly id: T) {}

  equals(other: BaseEntity<T>): boolean {
    return this.id === other.id;
  }

  abstract validate(): boolean;
}

export interface IRepository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
EOF

  # 2. Domain Shared Kernel - Usa Shared Core
  info "📦 Domain Shared Kernel -> Shared Core"
  cat > libs/domain/sharedkernel/src/lib/entities/audit.entity.ts << 'EOF'
import { BaseEntity } from '@glau/shared-core';

export class AuditEntity extends BaseEntity {
  constructor(
    id: string,
    public readonly createdAt: Date,
    public readonly createdBy: string,
    public updatedAt?: Date,
    public updatedBy?: string
  ) {
    super(id);
  }

  validate(): boolean {
    return !!this.createdAt && !!this.createdBy;
  }
}
EOF

  # 3. Domain Medical - Usa Shared Kernel
  info "📦 Domain Medical -> Shared Kernel"
  cat > libs/domain/medical/src/lib/entities/patient.entity.ts << 'EOF'
import { AuditEntity } from '@glau/domain-sharedkernel';

export class PatientEntity extends AuditEntity {
  constructor(
    id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly birthDate: Date,
    createdAt: Date,
    createdBy: string
  ) {
    super(id, createdAt, createdBy);
  }

  validate(): boolean {
    return super.validate() && !!this.name && !!this.email;
  }

  getAge(): number {
    const today = new Date();
    const age = today.getFullYear() - this.birthDate.getFullYear();
    return age;
  }
}
EOF

  # 4. Domain User - Usa Shared Kernel
  info "📦 Domain User -> Shared Kernel"
  cat > libs/domain/user/src/lib/entities/user.entity.ts << 'EOF'
import { AuditEntity } from '@glau/domain-sharedkernel';

export class UserEntity extends AuditEntity {
  constructor(
    id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly roles: string[],
    createdAt: Date,
    createdBy: string
  ) {
    super(id, createdAt, createdBy);
  }

  validate(): boolean {
    return super.validate() && !!this.username && !!this.email;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
EOF

  # 5. Infrastructure API Adapter - Usa Domain
  info "📦 Infrastructure API -> Domain"
  cat > libs/infrastructure/apiadapter/src/lib/clients/medical-api.client.ts << 'EOF'
import { Injectable } from '@angular/core';
import { PatientEntity } from '@glau/domain-medical';
import { IRepository } from '@glau/shared-core';

@Injectable({
  providedIn: 'root'
})
export class MedicalApiClient implements IRepository<PatientEntity> {
  private baseUrl = '/api/medical';

  async findById(id: string): Promise<PatientEntity | null> {
    // Implementación API
    return null;
  }

  async save(patient: PatientEntity): Promise<PatientEntity> {
    // Implementación API
    return patient;
  }

  async delete(id: string): Promise<void> {
    // Implementación API
  }
}
EOF

  # 6. Application Use Cases - Usa Domain + Infrastructure
  info "📦 Application Use Cases -> Domain + Infrastructure"
  cat > libs/application/usecases/src/lib/medical/patient-use-cases.ts << 'EOF'
import { Injectable } from '@angular/core';
import { PatientEntity } from '@glau/domain-medical';
import { MedicalApiClient } from '@glau/infrastructure-apiadapter';

@Injectable({
  providedIn: 'root'
})
export class PatientUseCases {
  constructor(private medicalApi: MedicalApiClient) {}

  async createPatient(data: {
    name: string;
    email: string;
    birthDate: Date;
  }): Promise<PatientEntity> {
    const patient = new PatientEntity(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.birthDate,
      new Date(),
      'system'
    );

    if (!patient.validate()) {
      throw new Error('Invalid patient data');
    }

    return await this.medicalApi.save(patient);
  }

  async getPatient(id: string): Promise<PatientEntity | null> {
    return await this.medicalApi.findById(id);
  }
}
EOF

  # 7. Apps - Usan Application + Shared
  info "📦 Apps -> Application + Shared"
  cat > apps/hosts/shell/src/app/core/services/app.service.ts << 'EOF'
import { Injectable } from '@angular/core';
import { PatientUseCases } from '@glau/application-usecases';
import { BaseEntity } from '@glau/shared-core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private patientUseCases: PatientUseCases) {}

  async initializeApp(): Promise<void> {
    console.log('App initialized with Clean Architecture');
  }
}
EOF

  # 8. Actualizar todos los barrel exports
  update_barrel_exports
}

# Función para actualizar barrel exports
update_barrel_exports() {
  info "📦 Actualizando barrel exports..."

  # Shared Core
  cat > libs/shared/core/src/index.ts << 'EOF'
export * from './lib/shared-core';
export * from './lib/base/base.entity';
EOF

  # Domain Shared Kernel
  cat > libs/domain/sharedkernel/src/index.ts << 'EOF'
export * from './lib/domain-sharedkernel';
export * from './lib/entities/audit.entity';
EOF

  # Domain Medical
  cat > libs/domain/medical/src/index.ts << 'EOF'
export * from './lib/domain-medical';
export * from './lib/entities/patient.entity';
EOF

  # Domain User
  cat > libs/domain/user/src/index.ts << 'EOF'
export * from './lib/domain-user';
export * from './lib/entities/user.entity';
EOF

  # Infrastructure API Adapter
  cat > libs/infrastructure/apiadapter/src/index.ts << 'EOF'
export * from './lib/infrastructure-apiadapter';
export * from './lib/clients/medical-api.client';
EOF

  # Application Use Cases
  cat > libs/application/usecases/src/index.ts << 'EOF'
export * from './lib/application-usecases';
export * from './lib/medical/patient-use-cases';
EOF

  success "✅ Barrel exports actualizados"
}

# Función para crear directorios adicionales
create_additional_directories() {
  log "📁 Creando directorios adicionales..."

  # Tools
  local tools_dirs=$(jq -r '.tools.directories[]' "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$tools_dirs" ]; then
      while IFS= read -r dir; do
          mkdir -p "$dir"
          debug "📁 Creado: $dir"
      done <<< "$tools_dirs"
  fi

  # Configs
  local config_dirs=$(jq -r '.configs.directories[]' "$CONFIG_FILE" 2>/dev/null)
  if [ -n "$config_dirs" ]; then
      while IFS= read -r dir; do
          mkdir -p "$dir"
          debug "📁 Creado: $dir"
      done <<< "$config_dirs"
  fi
}

# Función para mostrar resumen
show_summary() {
  log "📊 Resumen final..."

  local project_name=$(jq -r '.monorepo.name' "$CONFIG_FILE")

  echo ""
  success "🎉 ¡Monorepo '$project_name' COMPLETADO CON DEPENDENCIAS!"
  echo ""

  info "📋 Infraestructura creada:"
  echo ""

  echo "  🏠 Hosts:"
  for host in "${!CREATED_HOSTS[@]}"; do
      echo "    - $host"
  done

  echo ""
  echo "  📱 Remotes:"
  for remote in "${!CREATED_REMOTES[@]}"; do
      echo "    - $remote"
  done

  echo ""
  echo "  📚 Librerías:"
  for lib in "${!CREATED_LIBRARIES[@]}"; do
      echo "    - $lib"
  done

  echo ""
  success "🔗 Dependencias creadas:"
  echo "  - Shared Core ← Base para todo"
  echo "  - Domain Shared Kernel ← Shared Core"
  echo "  - Domain Medical/User ← Shared Kernel"
  echo "  - Infrastructure ← Domain"
  echo "  - Application ← Domain + Infrastructure"
  echo "  - Apps ← Application + Shared"

  echo ""
  warning "🚀 Comandos útiles:"
  echo "  nx graph                    # Ver dependencias"
  echo "  nx serve shell              # Servir host"
  echo "  nx run-many --target=build --all"
}

# FUNCIÓN PRINCIPAL
main() {
  # Validar JSON
  if ! jq empty "$CONFIG_FILE" 2>/dev/null; then
      error "JSON inválido en $CONFIG_FILE"
      exit 1
  fi

  success "✅ JSON válido - Iniciando proceso completo..."

  # Crear todo
  create_hosts
  create_remotes
  create_libraries
  create_additional_directories

  # NUEVO: Crear dependencias reales
  create_library_dependencies

  # Mostrar resumen
  show_summary
}

# Ejecutar
main

log "✅ ¡Proceso COMPLETO con DEPENDENCIAS terminado!"
