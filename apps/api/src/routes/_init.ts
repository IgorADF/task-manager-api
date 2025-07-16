import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users";
import { authRoutes } from "./auth";

export async function initRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(usersRoutes, { prefix: "/users" });
}
