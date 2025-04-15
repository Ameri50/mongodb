const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = './data/categories.json';

// Función para leer datos
const readData = () => JSON.parse(fs.readFileSync(filePath));

// GET todas las categorías
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// GET una categoría por ID
router.get('/:id', (req, res) => {
  const data = readData();
  const categoria = data.find(c => c.id === parseInt(req.params.id));
  categoria ? res.json(categoria) : res.status(404).json({ msg: 'Categoría no encontrada' });
});

// POST crear una nueva categoría
router.post('/', (req, res) => {
  const data = readData();
  const nueva = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    nombre: req.body.nombre
  };
  data.push(nueva);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(nueva);
});

// PUT actualizar una categoría
router.put('/:id', (req, res) => {
  let data = readData();
  const index = data.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index].nombre = req.body.nombre;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } else {
    res.status(404).json({ msg: 'Categoría no encontrada' });
  }
});

// DELETE una categoría
router.delete('/:id', (req, res) => {
  let data = readData();
  const index = data.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    const eliminada = data.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json(eliminada);
  } else {
    res.status(404).json({ msg: 'Categoría no encontrada' });
  }
});

module.exports = router;
