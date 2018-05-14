// Conexion a base de datos
var db = require('./conexion');

/**
*
* CRUD de Productos
*
**/

class Productos
{
	/**
	* Obtener todos los productos
	**/
	obtenerProductos(req, res, next) {
		db.connection.any('select * from productos order by id_producto')
		.then(function (data) {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Se obtuvieron todos los productos.'
				});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener todos los productos para combo de seleccion
	**/
	obtenerProductosSeleccion(req, res, next) {
		db.connection.any('select id_producto AS value, descripcion AS label from productos where existencia > 0 order by descripcion')
		.then(function (data) {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Se obtuvieron todos los productos.'
				});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener un producto por su id
	**/
	obtenerProducto(req, res, next) {
		var idProducto = parseInt(req.params.idProducto);
		db.connection.one('select * from productos where id_producto = $1', idProducto)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						data: data,
						message: 'Producto obtenido.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Agregar un nuevo producto
	**/
	agregarProducto(req, res, next) {
		db.connection.one('insert into productos(descripcion,precio)' +
				'values(${descripcion},${precio}) returning id_producto',
			req.body)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						message: 'Producto agregado.',
						id_producto: data.id_producto
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Actualizar un producto por su id
	**/
	actualizarProducto(req, res, next) {
		var idProducto = parseInt(req.params.idProducto);
		db.connection.none('update productos set descripcion=$1,precio=$2 where id_producto=$3',
			[req.body.descripcion,req.body.precio,idProducto])
			.then(function () {
				res.status(200)
					.json({
						status: 'success',
						message: 'Producto actualizado.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Actualizar existencia de un producto por su id
	**/
	actualizarExistenciaProducto(req, res, next) {
		var idProducto = parseInt(req.params.idProducto);
		db.connection.none('update productos set existencia=COALESCE(existencia,0)+$1 where id_producto=$2',
			[req.body.cantidad,idProducto])
			.then(function () {
				res.status(200)
					.json({
						status: 'success',
						message: 'Existencia de producto actualizada.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Eliminar un producto por su id
	**/
	eliminarProducto(req, res, next) {
		var idProducto = parseInt(req.params.idProducto);

		db.connection.one('select count(*) as total from ventas_detalle where id_producto = $1', idProducto)
		.then(function (data) {
			console.log(data.total);
			if(parseInt(data.total,10)==0){
				
				db.connection.result('delete from entradas where id_producto = $1', idProducto)
					.then(function (result) {
						
						db.connection.result('delete from productos where id_producto = $1', idProducto)
						.then(function (result) {
							res.status(200)
								.json({
									status: 'success',
									message: 'Producto eliminado.'
								});
						})
						.catch(function (err) {
							return next(err);
						});

				})
				.catch(function (err) {
					return next(err);
				});

			}else{
				res.status(200)
				.json({
					status: 'success',
					message: 'Producto tiene ventas asociadas.'
				});
			}
		})
		.catch(function (err) {
			return next(err);
		});

	}
}

//Exportar clase a la API
module.exports = Productos;