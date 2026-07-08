const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(['8.8.8.8', '8.8.4.4']);

const conectarDB = async () => {
  try {
  
    const URI = process.env.MONGODB_URI;
    
    await mongoose.connect(URI);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.log('Error al conectar a MongoDB:', err);
    process.exit(1);
  }
};
module.exports = conectarDB;