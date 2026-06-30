const Servicio = require('../models/servicios.model');


exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    // Si el cliente acepta HTML, renderizar la vista de listado
    if (req.accepts && req.accepts('html')) {
      return res.render('pages/listadoservicios', { servicios });
    }
    // Por defecto devolver JSON
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.crearServicio = async (req, res) => {
  try {
    const nuevoServicio = new Servicio(req.body);
    await nuevoServicio.save();
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.insertarDatosIniciales = async (req, res) => {
  try {
    const serviciosExistentes = await Servicio.countDocuments();
    
    if (serviciosExistentes > 0) {
      return res.status(400).json({ mensaje: "Los datos iniciales ya existen" });
    }

    const servicios = [
      { nombre: "Consulta General", descripcion: "Consulta médica general", precio: 50, duracion: "30 minutos" },
      { nombre: "Limpieza Dental", descripcion: "Limpieza completa de dientes", precio: 80, duracion: "45 minutos" },
      { nombre: "Revisión", descripcion: "Revisión completa", precio: 100, duracion: "1 hora" }
    ];

    await Servicio.insertMany(servicios);
    res.status(201).json({ mensaje: "Datos iniciales insertados correctamente", cantidad: servicios.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.actualizarServicio = async (req, res) => {
  try {
    const servicioActualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(servicioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarServicio = async (req, res) => {
  try {
    await Servicio.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.vistaListadoServicios = async (req, res) => {
  try {
    const listado = await Servicio.find();
    res.render('pages/listadoservicios', { servicios: listado });
  } catch (error) {
    res.status(500).send('Error al cargar la página de servicios: ' + error.message);
  }
};