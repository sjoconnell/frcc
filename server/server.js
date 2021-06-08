const express = require('express');
const { parts, manufacturingProcesses } = require(__dirname + '/data.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'per-page, page-number, total-entries, total-pages');
  next();
});

const pageSize = 5;

const getPage = (pageNumber) => {
  const startingIndex = (pageNumber - 1) * pageSize;
  const endingIndex = startingIndex + pageSize;
  return parts.slice(startingIndex, endingIndex);
};

app.get('/parts', (req, res) => {
  const pageNumber = req.query.page || 1;
  const totalPages = Math.ceil(parts.length / pageSize);
  const result = getPage(pageNumber);

  res.setHeader('per-page', pageSize);
  res.setHeader('page-number', pageNumber);
  res.setHeader('total-entries', parts.length);
  res.setHeader('total-pages', totalPages);

  return res.json({ data: result });
});

app.get('/manufacturing_processes', (req, res) => {
  return res.json({ data: manufacturingProcesses });
});

app.put('/parts/:id', (req, res) => {
  console.log('PUT to part ID:', req.params.id);
  return res.json({ data: req.body });
});

const PORT = 5555;

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
