import http from 'http';
import { handleBackendApi } from './apiRouter';

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api/')) {
    handleBackendApi(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'EcoQuest API Server: Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🌱 EcoQuest Backend API Server running at http://localhost:${PORT}/api/`);
});

export default server;
