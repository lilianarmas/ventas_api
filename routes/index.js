//Importando el framework
const express = require('express');
const router = express.Router();

//Declarando los objetos de manejo del CRUD
const Clients = new require('./clients');
const clients = new Clients();

const Products = require('./products');
const products = new Products();

const Entries = require('./entries');
const entries = new Entries();

const Sales = require('./sales');
const sales = new Sales();

const SalesDetail = require('./salesDetail');
const salesDetail = new SalesDetail();

//cors
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Creando las rutas de la API

//Inicio
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Ventas' });
});

//Construyendo rutas de la API
router.get('/api/clients', clients.getClients);
router.get('/api/clientsList', clients.getClientsList);
router.get('/api/clients/:idClient', clients.getClient);
router.post('/api/clients', clients.addClient);
router.put('/api/clients/:idClient', clients.updateClient);
router.delete('/api/clients/:idClient', clients.deleteClient);

router.get('/api/products', products.getProducts);
router.get('/api/productsList', products.getProductsList);
router.get('/api/products/:idProduct', products.getProduct);
router.post('/api/products', products.addProduct);
router.put('/api/products/:idProduct', products.updateProduct);
router.put('/api/productExistence/:idProduct', products.updateProductExistence);
router.delete('/api/products/:idProduct', products.deleteProduct);

router.get('/api/entries', entries.getEntries);
router.get('/api/entries/:idEntry', entries.getEntry);
router.get('/api/productEntries/:idProduct', entries.getProductEntries);
router.post('/api/entries', entries.addEntry);
router.delete('/api/entries/:idEntry', entries.deleteEntry);

router.get('/api/sales', sales.getSales);
router.get('/api/sales/:idSale', sales.getSale);
router.post('/api/sales', sales.addSale);
router.delete('/api/sales/:idSale', sales.deleteSale);
router.get('/api/clientSales/:idClient', sales.getClientSales);

router.get('/api/salesDetail/:idSale', salesDetail.getSaleDetail);
router.post('/api/salesDetail', salesDetail.addSaleDetail);
router.delete('/api/salesDetail/:idSale/:idProduct', salesDetail.deleteSaleDetail);

module.exports = router;
