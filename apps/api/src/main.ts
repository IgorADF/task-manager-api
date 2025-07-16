import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { initRoutes } from "@/routes/_init";
import { envs } from "@/envs/envs";
import { DB } from "lib-core";
import fastifyJwt from "@fastify/jwt";
import { globalErrorMiddleware } from "./middlewares/global-errors";

const fastify = Fastify({
  logger: true,
});

async function runConfigs() {
  try {
    await DB.connectDbClient(envs.MONGO_DB_URL);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }

  fastify.register(fastifyJwt, {
    secret: envs.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    }
  );

  await initRoutes(fastify);

  fastify.setErrorHandler(globalErrorMiddleware);
}

async function boot() {
  await runConfigs();

  fastify
    .listen({ port: envs.SERVER_PORT })
    .then(() => {})
    .catch((err) => {
      fastify.log.error(err);
      process.exit(1);
    });
}

boot();
