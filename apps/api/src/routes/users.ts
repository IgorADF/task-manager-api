import { UserController } from "@/controllers/user";
import { FastifyInstance } from "fastify";

const controller = new UserController();

export function usersRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    { preHandler: [fastify.authenticate] },
    controller.createUser(fastify)
  );
}
