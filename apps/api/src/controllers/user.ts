import { FastifyReply, FastifyRequest } from "fastify";
import { Services, Repositories } from "lib-core";

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const rep = new Repositories.MongoUserRepository();

    const service = Services.CreateUserService;
    const serviceInstance = new service.Service(rep);

    const parsedBody = service.CreateUserSchema.parse(request.body);

    await serviceInstance.execute(parsedBody);
  }
}
