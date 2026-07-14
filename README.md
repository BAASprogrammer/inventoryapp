# InventoryApp — Sistema de Gestión de Inventario

Aplicación fullstack para administrar productos y clientes con operaciones CRUD, paginación y subida de imágenes. Creado por [BAASprogrammer](https://github.com/BAASprogrammer).

## Stack

**Backend:** .NET 10 + ASP.NET Core Web API + Entity Framework Core + SQL Server
**Frontend:** React 19 + TypeScript 6 + Vite 8 + Tailwind CSS 4

## Estructura

```
NET/
├── InventoryApi/           # Backend (API REST)
│   ├── Controllers/        # Endpoints HTTP
│   ├── DTOs/              # Objetos de transferencia
│   ├── Entities/          # Modelos de dominio
│   ├── Interfaces/        # Contratos (repositorios y servicios)
│   ├── Repositories/      # Acceso a datos (EF Core)
│   ├── Services/          # Lógica de negocio
│   ├── Data/              # DbContext
│   └── wwwroot/uploads/   # Imágenes subidas
│
└── inventory/              # Frontend (SPA)
    └── src/
        ├── features/
        │   ├── customers/  # Módulo clientes
        │   └── products/   # Módulo productos
        ├── shared/         # Configuración compartida
        └── utils/          # Validaciones
```

## Arquitectura

**Backend.** Capas: Controller → Service → Repository → EF Core. Inyección de dependencias, paginación a nivel de base de datos, nullable reference types habilitado.

**Frontend.** Feature folders: cada módulo tiene `components/`, `hooks/`, `services/`, `types/`. Custom hooks para estado y lógica, servicios para comunicación HTTP.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista productos (paginado) |
| POST | `/api/products` | Crea producto |
| PUT | `/api/products/{id}` | Actualiza producto |
| DELETE | `/api/products/{id}` | Elimina producto |
| GET | `/api/customers` | Lista clientes |
| POST | `/api/customers` | Crea cliente |
| PUT | `/api/customers/{id}` | Actualiza cliente |
| DELETE | `/api/customers/{id}` | Elimina cliente |

## Ejecutar

### Backend
```bash
cd InventoryApi
dotnet run
```

### Frontend
```bash
cd inventory
npm install
npm run dev
```

La API corre en `http://localhost:5122` y el frontend en `http://localhost:5173`. Configurar cadena de conexión en `appsettings.json`.
