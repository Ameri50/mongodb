router.get('/', (req, res) => {
  const data = readData(); // data de productos

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || data.length;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const resultados = data.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: data.length,
    resultados
  });
});
