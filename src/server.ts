import Fastify from 'fastify';

import router from './routes/router.js';

export const server = Fastify({ logger: true });

server.register(router);