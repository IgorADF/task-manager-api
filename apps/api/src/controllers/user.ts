import { RouteFunction } from "@/@types/route.types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ServiceFactories } from "lib-core";

export class UserController {
  createUser(fastify: FastifyInstance): RouteFunction {
    const { service, schema } = ServiceFactories.createUserFactory();

    return async (request: FastifyRequest, reply: FastifyReply) => {
      const parsedBody = schema.parse(request.body);
      await service.execute(parsedBody);
    };
  }
}
