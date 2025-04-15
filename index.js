const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

// ⚠️ Aquí debe haber una URI válida
const MONGO_URI = 'mongodb://localhost:27017/mi-base-de-datos';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar con MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
