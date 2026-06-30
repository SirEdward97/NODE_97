const Producto = require('../models/producto.model');

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    // si acepta HTML, renderiza la vista
    if (req.accepts && req.accepts('html')) {
      return res.render('pages/listadoproductos', { productos });
    }
    return res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.insertarDatosIniciales = async (req, res) => {
  try {
    const existentes = await Producto.countDocuments();
    if (existentes > 0) {
      return res.status(400).json({ mensaje: 'Los datos iniciales ya existen' });
    }

    const productos = [
      { nombre: 'Producto A', descripcion: 'Descripción A', precio: 10, stock: 100 },
      { nombre: 'Producto B', descripcion: 'Descripción B', precio: 20, stock: 50 },
      { nombre: 'Producto C', descripcion: 'Descripción C', precio: 30, stock: 10 }
    ];

    await Producto.insertMany(productos);
    res.status(201).json({ mensaje: 'Datos iniciales insertados', cantidad: productos.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.vistaListadoProductos = async (req, res) => {
  try {
    const listado = await Producto.find();
    res.render('pages/listadoproductos', { productos: listado });
  } catch (error) {
    res.status(500).send('Error al cargar la página de productos: ' + error.message);
  }
};

exports.formulario = async (req, res) => {
  res.render('pages/registrarproducto');
};
