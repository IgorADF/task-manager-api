import { RouteFunction } from "@/@types/custom/route.types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Services, Repositories } from "lib-core";

export class UserController {
  create(fastify: FastifyInstance): RouteFunction {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const service = Services.CreateUserService;

      const parsedBody = service.CreateUserSchema.parse(request.body);

      const rep = new Repositories.MongoUserRepository();
      const serviceInstance = new service.Service(rep);

      await serviceInstance.execute(parsedBody);
    };
  }

  async inviteToTeam(request: FastifyRequest, reply: FastifyReply) {}
}
