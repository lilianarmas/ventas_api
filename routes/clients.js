// Conexion a base de datos
const db = require('./connect');

/**
*
* Clase de Clientes
*
**/

class Clients
{
    /**
    * Obtener todos los clientes
    **/
    getClients(req, res, next) {
        db.connection.any('select * from clients order by client_id')
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todos los clientes.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener todos los clientes para combo de seleccion
    **/
    getClientsList(req, res, next) {
        db.connection.any('select client_id AS value, name AS label from clients order by name')
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todos los clientes.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener un cliente por su id
    **/
    getClient(req, res, next) {
        let clientId = parseInt(req.params.clientId);
        db.connection.one('select * from clients where client_id = $1', clientId)
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Cliente obtenido.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Agregar un nuevo cliente
    **/
    addClient(req, res, next) {
        db.connection.none('insert into clients(name) values(${name})', req.body)
        .then(() => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Cliente agregado.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Actualizar un cliente por su id
    **/
    updateClient(req, res, next) {
        let clientId = parseInt(req.params.clientId);
        db.connection.none('update clients set name=$1 where client_id=$2',
        [req.body.name,clientId])
        .then(() => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Cliente actualizado.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Eliminar un cliente por su id
    **/
    deleteClient(req, res, next) {
        let clientId = parseInt(req.params.clientId);
        db.connection.result('delete from clients where client_id = $1', clientId)
        .then(result => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Cliente eliminado.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }
}

//Exportar clase a la API
module.exports = Clients;
