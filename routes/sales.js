// Conexion a base de datos
const db = require('./connect');

/**
*
* Clase de Ventas
*
**/

class Sales
{
    /**
    * Obtener todas las ventas
    **/
    getSales(req, res, next) {
        db.connection.any('select sale_id, clients.client_id, clients.name, TO_CHAR(date,\'DD/MM/YYYY\') date, total from sales inner join clients on (clients.client_id = sales.client_id) order by sale_id')
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todas las sales.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener todas las compras de un cliente
    **/
    getClientSales(req, res, next) {
        let clientId = parseInt(req.params.clientId);
        db.connection.any('select sale_id, clients.client_id, clients.name, TO_CHAR(date,\'DD/MM/YYYY\') date, total from sales inner join clients on (clients.client_id = sales.client_id) where sales.client_id = $1 order by sale_id', clientId)
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todas las ventas del cliente.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener una venta por su id
    **/
    getSale(req, res, next) {
        let idSale = parseInt(req.params.idSale);
        db.connection.one('select * from sales where sale_id = $1', idSale)
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Venta obtenida.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Agregar una nueva venta
    **/
    addSale(req, res, next) {
        db.connection.one('insert into sales(client_id,total) values(${client_id},${total}) returning sale_id', req.body)
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Venta agregada.',
                sale_id: data.sale_id
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Eliminar una venta por su id
    **/
    deleteSale(req, res, next) {
        let idSale = parseInt(req.params.idSale);
        db.connection.result('delete from sales where sale_id = $1', idSale)
        .then(result => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Venta eliminada.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }
}

//Exportar clase a la API
module.exports = Sales;
