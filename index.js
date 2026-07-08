require('dotenv').config();
const express = require('express');
const  conectarDB = require('./config/connectiondb');


const clienteController = require('./controllers/cliente.controller');
const servicioController = require('./controllers/servicios.controller');
const productoController = require('./controllers/producto.controller');

const app = express();
const enrutamiento = require('./router/enrutamien.router');

app.set('view engine', 'ejs');
app.use('/api/v1', enrutamiento);

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

conectarDB();

app.get('/', (req, res) => {
  res.render('pages/index');
});
app.get('/formulario', clienteController.formulario)

app.get('/clientes', clienteController.obtenerClientes);
app.post('/clientes', clienteController.crearCliente);
app.get('/servicios', servicioController.obtenerServicios);
app.post('/servicios/seed', servicioController.insertarDatosIniciales);
app.get('/listadoservicios', servicioController.vistaListadoServicios);
app.get('/productos', productoController.obtenerProductos);
app.post('/productos', productoController.crearProducto);
app.post('/productos/seed', productoController.insertarDatosIniciales);
app.get('/listadoproductos', productoController.vistaListadoProductos);
app.get('/productos/formulario', productoController.formulario)
app.get('/listadoclientes', clienteController.vistaListadoClientes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}/`);
});