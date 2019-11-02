// Conexion a base de datos
const db = require('./connect');

/**
*
* CRUD de Productos
*
**/

class Products
{
    /**
    * Obtener todos los productos
    **/
    getProducts(req, res, next) {
        db.connection.any('select * from products order by product_id')
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todos los productos.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener todos los productos para combo de seleccion
    **/
    getProductsList(req, res, next) {
        db.connection.any('select product_id AS value, description AS label from products where quantity > 0 order by description')
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Se obtuvieron todos los productos.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Obtener un producto por su id
    **/
    getProduct(req, res, next) {
        let productId = parseInt(req.params.productId);
        db.connection.one('select * from products where product_id = $1', productId)
            .then(data => {
                res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Producto obtenido.'
                });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Agregar un nuevo producto
    **/
    addProduct(req, res, next) {
        db.connection.one('insert into products(description,price,quantity) values(${description},${price},${quantity}) returning product_id', req.body)
        .then(data => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Producto agregado.',
                product_id: data.product_id
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Actualizar un producto por su id
    **/
    updateProduct(req, res, next) {
        let productId = parseInt(req.params.productId);
        db.connection.none('update products set description=$1,price=$2 where product_id=$3',
        [req.body.description, req.body.price, productId])
        .then(() => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Producto actualizado.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Actualizar existencia de un producto por su id
    **/
    updateProductExistence(req, res, next) {
        let productId = parseInt(req.params.productId);
        db.connection.none('update products set quantity=COALESCE(quantity,0)+$1 where product_id=$2',
        [req.body.quantity, productId])
        .then(() => {
            res.status(200)
            .json({
                status: 'success',
                message: 'Existencia de producto actualizada.'
            });
        })
        .catch(err => {
            return next(err);
        });
    }

    /**
    * Eliminar un producto por su id
    **/
    deleteProduct(req, res, next) {
        let productId = parseInt(req.params.productId);

        db.connection.one('select count(*) as total from sales_detail where product_id = $1', productId)
        .then(data => {
            if(parseInt(data.total,10) === 0) {

                db.connection.result('delete from entries where product_id = $1', productId)
                .then(result => {

                    db.connection.result('delete from products where product_id = $1', productId)
                    .then(result => {
                        res.status(200)
                        .json({
                            status: 'success',
                            message: 'Producto eliminado.'
                        });
                    })
                    .catch(err => {
                        return next(err);
                    });
                })
                .catch(err => {
                    return next(err);
                });

            } else {
                res.status(200)
                .json({
                    status: 'success',
                    message: 'Producto tiene ventas asociadas.'
                });
            }
        })
        .catch(err => {
            return next(err);
        });
    }
}

//Exportar clase a la API
module.exports = Products;
