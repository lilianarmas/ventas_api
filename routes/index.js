//Importando el framework
var express = require('express');
var router = express.Router();

//Declarando los objetos de manejo del CRUD
var Clientes = new require('./clientes');
var clientes = new Clientes();

var Productos = require('./productos');
var productos = new Productos();

var Entradas = require('./entradas');
var entradas = new Entradas();

var Ventas = require('./ventas');
var ventas = new Ventas();

var VentasDetalle = require('./ventasDetalle');
var ventasDetalle = new VentasDetalle();

//cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Creando las rutas de la API

//Inicio
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ventas' });
});

//Construyendo rutas de la API
router.get('/api/clientes', clientes.obtenerClientes);
router.get('/api/clientesSeleccion', clientes.obtenerClientesSeleccion);
router.get('/api/clientes/:idCliente', clientes.obtenerCliente);
router.post('/api/clientes', clientes.agregarCliente);
router.put('/api/clientes/:idCliente', clientes.actualizarCliente);
router.delete('/api/clientes/:idCliente', clientes.eliminarCliente);

router.get('/api/productos', productos.obtenerProductos);
router.get('/api/productosSeleccion', productos.obtenerProductosSeleccion);
router.get('/api/productos/:idProducto', productos.obtenerProducto);
router.post('/api/productos', productos.agregarProducto);
router.put('/api/productos/:idProducto', productos.actualizarProducto);
router.put('/api/productosExistencia/:idProducto', productos.actualizarExistenciaProducto);
router.delete('/api/productos/:idProducto', productos.eliminarProducto);

router.get('/api/entradas', entradas.obtenerEntradas);
router.get('/api/entradas/:idEntrada', entradas.obtenerEntrada);
router.get('/api/entradasProducto/:idProducto', entradas.obtenerEntradasProducto);
router.post('/api/entradas', entradas.agregarEntrada);
router.delete('/api/entradas/:idEntrada', entradas.eliminarEntrada);

router.get('/api/ventas', ventas.obtenerVentas);
router.get('/api/ventas/:idVenta', ventas.obtenerVenta);
router.post('/api/ventas', ventas.agregarVenta);
router.delete('/api/ventas/:idVenta', ventas.eliminarVenta);
router.get('/api/ventasCliente/:idCliente', ventas.obtenerVentasCliente);

router.get('/api/ventasDetalle/:idVenta', ventasDetalle.obtenerVentaDetalle);
router.post('/api/ventasDetalle', ventasDetalle.agregarVentaDetalle);
router.delete('/api/ventasDetalle/:idVenta/:idProducto', ventasDetalle.eliminarVentaDetalle);

module.exports = router;