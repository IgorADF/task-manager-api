import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users";

export async function initRoutes(fastify: FastifyInstance) {
  fastify.register(usersRoutes, { prefix: "/users" });
}
