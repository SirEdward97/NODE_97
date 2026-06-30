
const Cliente = require('../models/cliente.model');

exports.home = async (req, res) => {
  res.render('pages/index');
};
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    // Si el cliente acepta HTML (normal en navegadores), renderiza la vista
    if (req.accepts && req.accepts('html')) {
      return res.render('pages/listadoclientes', { clientes });
    }
    // Por defecto devuelve JSON (API)
    return res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.eliminarCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.vistaListadoClientes = async (req, res) => {
  try {
    const listado = await Cliente.find(); 
    res.render('pages/listadoclientes', { clientes: listado });
  } catch (error) {
    res.status(500).send("Error al cargar la página de clientes: " + error.message);
  }
};
exports.formulario = async (req, res) => {
  res.render('pages/registrarcliente');
}    
