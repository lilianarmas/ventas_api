# API Sistema de Ventas

_API con propósitos de DESARROLLO que gestiona CRUD de Clientes, Productos, Entradas y Ventas._

### Pre-requisitos 📋

_Creación de Base de Datos PostgreSQL_

```
/db/sales.sql
```

_Configuración de Archivo de Conexión_

```
/routes/conexion.js

const connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'sales',
    user: 'postgres',
    password: 'XXXXXX'
};
```

### Instalación 🔧

```
npm install
```

## Construido con 🛠️

* [Node.js](https://nodejs.org/es/)
* [Express.js](https://expressjs.com/es/)
* [PostgreSQL](https://www.postgresql.org/)