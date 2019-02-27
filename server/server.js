import express from 'express';
import http from 'http';

import config from './config';
import healthcheck from './healthcheck-api';

// initialize the express server
const app = express();
const server = http.createServer(app);
const router = express.Router();


// disable express default headers
app.disable('x-powered-by');

app.use('/', healthcheck(router));
app.use(express.static(`${__dirname}/${config.dist}`))

// Configure / start the server
server.maxConnections = config.server.maxConnections;

const port = config.server.port;
const serverName = config.server.name;

server.listen(port, () => {
  console.info(`${serverName} now listening on ${port}`);
});

