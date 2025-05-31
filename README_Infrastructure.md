# JSON Infrastructure - Monorepo Automation

Sistema de automatización para crear monorepos de Angular con arquitectura hexagonal y microfrontends usando configuración JSON declarativa.

## 🚀 Características

- **Configuración Declarativa**: Define toda la estructura en un archivo JSON
- **Arquitectura Hexagonal**: Organización por capas (Domain, Application, Infrastructure)
- **Microfrontends**: Soporte completo para Module Federation
- **Detección Automática**: Funciona con o sin `jq` instalado
- **Manejo de Errores**: Validación y fallbacks automáticos
- **Estructura Completa**: Crea directorios, componentes, servicios, guards, etc.

## 📋 Requisitos

- **Nx Workspace** ya inicializado
- **Node.js** y **npm/bun**
- **jq** (opcional, pero recomendado para funcionalidad completa)

### Instalar jq (Recomendado)

```bash
# Windows (con Chocolatey)
choco install jq

# Windows (con Scoop)
scoop install jq

# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq
```

## 🛠️ Uso

### 1. Crear archivo de configuración

Crea `monorepo-infrastructure.json` en la raíz de tu proyecto:

```json
{
"monorepo": {
  "name": "mi-monorepo",
  "description": "Mi monorepo personalizado",
  "version": "1.0.0",
  "workspace": {
    "npmScope": "@miempresa",
    "packageManager": "bun"
  }
},
"applications": {
  "hosts": [...],
  "remotes": [...]
},
"libraries": {
  "shared": {...},
  "domain": {...},
  "application": {...},
  "infrastructure": {...}
}
}
```

### 2. Ejecutar el script

```bash
chmod +x create-json-infrastructure.sh
./create-json-infrastructure.sh
```

## 📁 Estructura del JSON

### Configuración del Monorepo

```json
{
"monorepo": {
  "name": "nombre-del-proyecto",
  "description": "Descripción del proyecto",
  "version": "1.0.0",
  "workspace": {
    "npmScope": "@scope",
    "packageManager": "bun|npm|yarn"
  }
}
}
```
