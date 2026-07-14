const { Router } = require("express");
const router = Router();
const clienteController = require("../controllers/cliente.controller");
const servicioController = require("../controllers/servicios.controller");
const productoController = require("../controllers/producto.controller");


// --- RUTAS DE CLIENTES ---
router.get('/formulario', clienteController.formulario);
router.get('/clientes', clienteController.obtenerClientes);
router.post('/clientes', clienteController.crearCliente);
router.get('/listadoclientes', clienteController.vistaListadoClientes);

// Rutas POST para los modales de EJS (formeditar y formeliminar)
router.post('/clientes/editar', clienteController.editarCliente);
router.post('/clientes/eliminar', clienteController.eliminarCliente);

// --- RUTAS DE SERVICIOS ---
router.get('/servicios', servicioController.obtenerServicios);
router.post('/servicios/seed', servicioController.insertarDatosIniciales);
router.get('/listadoservicios', servicioController.vistaListadoServicios);
router.get ('/tiendaCatalogo',servicioController.tiendaCatalogo);

// --- RUTAS DE PRODUCTOS ---
router.get('/productos', productoController.obtenerProductos);
router.post('/productos', productoController.crearProducto);
router.post('/productos/seed', productoController.insertarDatosIniciales);
router.get('/productos/formulario', productoController.formulario);
router.get('/listadoproductos', productoController.vistaListadoProductos);

module.exports = router;