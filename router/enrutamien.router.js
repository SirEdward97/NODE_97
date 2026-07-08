const { Router } = require("express");
const clienteController = require("../controllers/cliente.controller");
const servicioController = require("../controllers/servicios.controller");
const productoController = require("../controllers/producto.controller");
const router = Router();

router.get('/formulario', clienteController.formulario);
router.get('/clientes', clienteController.obtenerClientes);
router.post('/clientes', clienteController.crearCliente);
router.post('/clientes/actualizar', clienteController.actualizarClienteW);
router.get('/listadoclientes', clienteController.vistaListadoClientes);
router.put('/clientes/:id', clienteController.actualizarClienteW);
router.delete('/clientes/:id', clienteController.eliminarCliente);

router.get('/servicios', servicioController.obtenerServicios);
router.post('/servicios/seed', servicioController.insertarDatosIniciales);
router.get('/listadoservicios', servicioController.vistaListadoServicios);
router.get('/productos', productoController.obtenerProductos);
router.post('/productos', productoController.crearProducto);
router.post('/productos/seed', productoController.insertarDatosIniciales);
router.get('/productos/formulario', productoController.formulario);
router.get('/listadoproductos', productoController.vistaListadoProductos);


module.exports = router;