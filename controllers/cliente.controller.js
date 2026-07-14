const Cliente = require('../models/cliente.model');

exports.home = async (req, res) => {
  res.render('pages/index');
};

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    if (req.accepts && req.accepts('html')) {
      return res.render('pages/listadoclientes', { clientes });
    }
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

exports.editarCliente = async (req, res) => {
  try {
    const { id, nombre, email, telefono } = req.body;
    await Cliente.findByIdAndUpdate(id, { 
        nombre, 
        email, 
        telefono: telefono || null 
    });
    res.redirect('/listadoclientes');
  } catch (error) {
    res.status(500).send("Error al actualizar cliente: " + error.message);
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.body; 

    if (!id) {
      return res.status(400).send("ID de cliente no proporcionado");
    }
    await Cliente.findByIdAndDelete(id);
    res.redirect('/listadoclientes');
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).send("Ocurrió un error al intentar eliminar el cliente");
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
};