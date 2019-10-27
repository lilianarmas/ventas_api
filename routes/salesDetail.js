// Conexion a base de datos
const db = require('./connect');

/**
*
* Clase de Detalles de Ventas
*
**/

class SalesDetail
{
    /**
    * Obtener todos los detalles de una venta
    **/
    getSaleDetail(req, res, next) {
        let idSale = parseInt(req.params.idSale);
        db.connection.any('select sale_id, sales_detail.product_id, descripcion, item, quantity, sales_detail.price, total from sales_detail inner join productos on (sales_detail.product_id = productos.product_id) where sale_id = $1 order by item', idSale)
            .then(data => {
                res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Se obtuvieron todos los detalles de la venta.'
                });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Agregar un nuevo detalle a la venta
    **/
    addSaleDetail(req, res, next) {
        db.connection.none('insert into sales_detail(sale_id,item,product_id,quantity,price,total)' +
        'values(${sale_id},${item},${product_id},${quantity},${price},${total})', req.body)
        .then(() => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Detalle de venta agregada.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Eliminar un detalle de venta por su id
    **/
    deleteSaleDetail(req, res, next) {
        let idSale = parseInt(req.params.idSale);
        let idProduct = parseInt(req.params.idProduct);
        db.connection.result('delete from sales_detail where sale_id = $1 and product_id = $2', [idSale, idProduct])
        .then(result => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Detalle de venta eliminada.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }
}

//Exportar clase a la API
module.exports = SalesDetail;
