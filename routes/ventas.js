// Conexion a base de datos
var db = require('./conexion');

/**
*
* Clase de Ventas
*
**/

class Ventas
{
	/**
	* Obtener todas las ventas
	**/
	obtenerVentas(req, res, next) {
		db.connection.any("select id_venta, clientes.id_cliente, clientes.nombre, TO_CHAR(fecha,'DD/MM/YYYY') fecha, total_general from ventas inner join clientes on (clientes.id_cliente = ventas.id_cliente) order by id_venta")
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						data: data,
						message: 'Se obtuvieron todas las ventas.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener todas las compras de un cliente
	**/
	obtenerVentasCliente(req, res, next) {
		var idCliente = parseInt(req.params.idCliente);
		db.connection.any("select id_venta, clientes.id_cliente, clientes.nombre, TO_CHAR(fecha,'DD/MM/YYYY') fecha, total_general from ventas inner join clientes on (clientes.id_cliente = ventas.id_cliente) where ventas.id_cliente = $1 order by id_venta",idCliente)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						data: data,
						message: 'Se obtuvieron todas las ventas del cliente.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener una venta por su id
	**/
	obtenerVenta(req, res, next) {
		var idVenta = parseInt(req.params.idVenta);
		db.connection.one('select * from ventas where id_venta = $1', idVenta)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						data: data,
						message: 'Venta obtenida.'
					});
			})
			.catch(function (err) {
				return next(err);
			});
	}

	/**
	* Agregar una nueva venta
	**/
	agregarVenta(req, res, next) {
		db.connection.one('insert into ventas(id_cliente,total_general)' +
				'values(${id_cliente},${total_general}) returning id_venta',
			req.body)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						message: 'Venta agregada.',
						id_venta: data.id_venta
					});
			})
			.catch(function (err) {
				return next(err);
			});
	}

	/**
	* Eliminar una venta por su id
	**/
	eliminarVenta(req, res, next) {
		var idVenta = parseInt(req.params.idVenta);
		db.connection.result('delete from ventas where id_venta = $1', idVenta)
			.then(function (result) {
				res.status(200)
					.json({
						status: 'success',
						message: 'Venta eliminada.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}
}

//Exportar clase a la API
module.exports = Ventas;