import { GroupController } from "@/controllers/group";
import { FastifyInstance } from "fastify";

const controller = new GroupController();

export function groupRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    { preHandler: [fastify.authenticate] },
    controller.create(fastify)
  );
}
