const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

// Forzar el uso de la colección existente 'productos' en la base de datos
const Producto = mongoose.model('Producto', productoSchema, 'productos');

module.exports = Producto;
