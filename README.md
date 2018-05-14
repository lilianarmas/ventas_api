# API Sistema de Ventas

_API que gestiona CRUD de Clientes, Productos, Entradas y Ventas._

### Pre-requisitos 📋

_Creación de Base de Datos PostgreSQL_

```
/bd/ventas.sql
```

_Configuración de Archivo de Conexión_

```
/routes/conexion.js

const connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'ventas',
    user: 'postgres',
    password: 'XXXXXX'
};
```

### Instalación 🔧

```
npm install
```