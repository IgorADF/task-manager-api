import { AuthController } from "@/controllers/auth";
import { FastifyInstance } from "fastify";

const controller = new AuthController();

export function authRoutes(fastify: FastifyInstance) {
  fastify.post("/session", controller.authUserSession(fastify));
}
