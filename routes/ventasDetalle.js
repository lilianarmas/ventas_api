// Conexion a base de datos
var db = require('./conexion');

/**
*
* Clase de Detalles de Ventas
*
**/

class VentasDetalle
{
	/**
	* Obtener todos los detalles de una venta
	**/
	obtenerVentaDetalle(req, res, next) {
		var idVenta = parseInt(req.params.idVenta);
		db.connection.any('select id_venta, ventas_detalle.id_producto, descripcion, renglon, cantidad, ventas_detalle.precio, total from ventas_detalle inner join productos on (ventas_detalle.id_producto = productos.id_producto) where id_venta = $1 order by renglon', idVenta)
			.then(function (data) {
				res.status(200)
					.json({
						status: 'success',
						data: data,
						message: 'Se obtuvieron todos los detalles de la venta.'
					});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Agregar un nuevo detalle a la venta
	**/
	agregarVentaDetalle(req, res, next) {
	  db.connection.none('insert into ventas_detalle(id_venta,renglon,id_producto,cantidad,precio,total)' +
		  'values(${id_venta},${renglon},${id_producto},${cantidad},${precio},${total})',
		req.body)
		.then(function () {
		  res.status(200)
			.json({
			  status: 'success',
			  message: 'Detalle de venta agregada.'
			});
		})
		.catch(function (err) {
		  return next(err);
		});
	}

	/**
	* Eliminar un detalle de venta por su id
	**/
	eliminarVentaDetalle(req, res, next) {
	  var idVenta = parseInt(req.params.idVenta);
	  var idProducto = parseInt(req.params.idProducto);
	  db.connection.result('delete from ventas_detalle where id_venta = $1 and id_producto = $2', [idVenta, idProducto])
		.then(function (result) {
		  res.status(200)
			.json({
			  status: 'success',
			  message: 'Detalle de venta eliminada.'
			});
		})
		.catch(function (err) {
		  return next(err);
		});
	}
}

//Exportar clase a la API
module.exports = VentasDetalle;