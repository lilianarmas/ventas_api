// Conexion a base de datos
var db = require('./conexion');

/**
*
* Clase de Entradas
*
**/

class Entradas
{
	/**
	* Obtener todos los entradas
	**/
	obtenerEntradas(req, res, next) {
		db.connection.any('select * from entradas order by id_entrada')
		.then(function (data) {
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Se obtuvieron todas las entradas a inventario.'
			});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener todos los entradas de un producto
	**/
	obtenerEntradasProducto(req, res, next) {
		var idProducto = parseInt(req.params.idProducto);
		db.connection.any("select id_entrada, id_producto, cantidad, TO_CHAR(fecha,'DD/MM/YYYY') fecha from entradas where id_producto = $1 order by id_entrada", idProducto)
		.then(function (data) {
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Se obtuvieron todas las entradas a inventario del producto.'
			});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener un entrada por su id
	**/
	obtenerEntrada(req, res, next) {
		var idEntrada = parseInt(req.params.idEntrada);
		db.connection.one('select * from entradas where id_entrada = $1', idEntrada)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						data: data,
						message: 'Entrada obtenido.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Agregar un nuevo entrada
	**/
	agregarEntrada(req, res, next) {
		db.connection.none('insert into entradas(id_producto,cantidad)' +
				'values(${id_producto},${cantidad})',
		req.body)
		.then(function () {
			res.status(200)
				.json({
					status: 'success',
					message: 'Entrada agregada.'
				});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Eliminar un entrada por su id
	**/
	eliminarEntrada(req, res, next) {
		var idEntrada = parseInt(req.params.idEntrada);
		db.connection.result('delete from entradas where id_entrada = $1', idEntrada)
			.then(function (result) {
				res.status(200)
					.json({
						status: 'success',
						message: 'Entrada eliminada.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}
}

//Exportar clase a la API
module.exports = Entradas;