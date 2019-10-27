const promise = require('bluebird');
const options = {
    promiseLib: promise
};
const pgp = require('pg-promise')(options);

//Conexion a la base de datos
const connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'sales',
    user: 'postgres',
    password: '123456'
};
const db = pgp(connectionString);

// Exportar la variable como modulo
exports.connection = db;
