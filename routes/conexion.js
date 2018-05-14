var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);

//Conexion a la base de datos
const connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'ventas',
    user: 'postgres',
    password: '123456'
};
var db = pgp(connectionString);

// Exportar la variable como modulo
exports.connection = db;