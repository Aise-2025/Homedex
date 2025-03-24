// server.js
const express = require('express');
const next = require('next');
const propertiesHandler = require('./api/properties');
const propertiesUpdateHandler = require('./api/propertiesUpdate');
const kiHandler = require('./api/ki');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware für JSON‑Body
  server.use(express.json());

  // API-Endpunkte
  server.get('/api/properties', propertiesHandler);
  server.post('/api/properties/update', propertiesUpdateHandler);
  server.post('/api/ki', kiHandler);

  // Alle weiteren Anfragen von Next.js bearbeiten
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
