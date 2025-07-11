import Fastify from "fastify";
import { initRoutes } from "@/routes/_init";
import { envs } from "@/envs/envs";
import { DB } from "lib-core";

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

  await initRoutes(fastify);
}

async function boot() {
  await runConfigs();

  fastify
    .listen({ port: envs.SERVER_PORT })
    .then(() => {
      fastify.log.info(`Server listening!`);
    })
    .catch((err) => {
      fastify.log.error(err);
      process.exit(1);
    });
}

boot();
