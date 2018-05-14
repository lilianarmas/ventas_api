// Conexion a base de datos
var db = require('./conexion');

/**
*
* Clase de Clientes
*
**/

class Clientes
{
	/**
	* Obtener todos los clientes
	**/
	obtenerClientes(req, res, next) {
		db.connection.any('select * from clientes order by id_cliente')
		.then(function (data) {
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Se obtuvieron todos los clientes.'
			});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener todos los clientes para combo de seleccion
	**/
	obtenerClientesSeleccion(req, res, next) {
		db.connection.any('select id_cliente AS value, nombre AS label from clientes order by nombre')
		.then(function (data) {
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Se obtuvieron todos los clientes.'
			});
		})
		.catch(function (err) {
			return next(err);
		});
	}

	/**
	* Obtener un cliente por su id
	**/
	obtenerCliente(req, res, next) {
	var idCliente = parseInt(req.params.idCliente);
	db.connection.one('select * from clientes where id_cliente = $1', idCliente)
	  .then(function (data) {
		res.status(200)
		  .json({
			status: 'success',
			data: data,
			message: 'Cliente obtenido.'
		  });
	  })
	  .catch(function (err) {
		return next(err);
	  });
	}

	/**
	* Agregar un nuevo cliente
	**/
	agregarCliente(req, res, next) {
	db.connection.none('insert into clientes(nombre)' +
		'values(${nombre})',
	  req.body)
	  .then(function () {
		res.status(200)
		  .json({
			status: 'success',
			message: 'Cliente agregado.'
		  });
	  })
	  .catch(function (err) {
		return next(err);
	  });
	}

	/**
	* Actualizar un cliente por su id
	**/
	actualizarCliente(req, res, next) {
	var idCliente = parseInt(req.params.idCliente);
	db.connection.none('update clientes set nombre=$1 where id_cliente=$2',
	  [req.body.nombre,idCliente])
	  .then(function () {
		res.status(200)
		  .json({
			status: 'success',
			message: 'Cliente actualizado.'
		  });
	  })
	  .catch(function (err) {
		return next(err);
	  });
	}

	/**
	* Eliminar un cliente por su id
	**/
	eliminarCliente(req, res, next) {
	var idCliente = parseInt(req.params.idCliente);
	db.connection.result('delete from clientes where id_cliente = $1', idCliente)
	  .then(function (result) {
		res.status(200)
		  .json({
			status: 'success',
			message: 'Cliente eliminado.'
		  });
	  })
	  .catch(function (err) {
		return next(err);
	  });
	}
}

//Exportar clase a la API
module.exports = Clientes;