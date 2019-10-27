// Conexion a base de datos
const db = require('./connect');

/**
*
* Clase de Entradas
*
**/

class Entries
{
    /**
    * Obtener todos los entradas
    **/
    getEntries(req, res, next) {
        db.connection.any('select * from entries order by entry_id')
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todas las entradas a inventario.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener todos los entradas de un producto
    **/
    getProductEntries(req, res, next) {
        let idProduct = parseInt(req.params.idProduct);
        db.connection.any('select entry_id, product_id, quantity, TO_CHAR(date,\'DD/MM/YYYY\') date from entries where product_id = $1 order by entry_id', idProduct)
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todas las entradas a inventario del producto.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener un entrada por su id
    **/
    getEntry(req, res, next) {
        let idEntry = parseInt(req.params.idEntry);
        db.connection.one('select * from entries where entry_id = $1', idEntry)
            .then(data => {
                res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Entrada obtenido.'
                });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Agregar un nuevo entrada
    **/
    addEntry(req, res, next) {
        db.connection.none('insert into entries(product_id,quantity) values(${product_id},${quantity})', req.body)
        .then(() => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Entrada agregada.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Eliminar un entrada por su id
    **/
    deleteEntry(req, res, next) {
        let idEntry = parseInt(req.params.idEntry);
        db.connection.result('delete from entries where entry_id = $1', idEntry)
            .then(result => {
                res.status(200)
                .json({
                    status: 'success',
                    message: 'Entrada eliminada.'
                });
        })
        .catch(err => {
            return next(err);
        });
    }
}

//Exportar clase a la API
module.exports = Entries;
