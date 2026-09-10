import { createServer } from 'node:http';
import { HttpMiddleware, HttpServer } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Layer } from 'effect';
import { DbLive } from './db/client.js';
import { router } from './router.js';

const PORT = 3031;

const ServerLive = NodeHttpServer.layer(() => createServer(), { port: PORT });

const HttpLive = HttpServer.serve(router, HttpMiddleware.cors()).pipe(
	Layer.provide(ServerLive),
	Layer.provide(DbLive),
);

NodeRuntime.runMain(Layer.launch(HttpLive));
