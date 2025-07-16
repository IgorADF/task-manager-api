import { RouteFunction } from "@/@types/route.types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Factories, ServiceErrors, Services } from "lib-core";

export class UserController {
  createUser(fastify: FastifyInstance): RouteFunction {
    const { service, schema } = Factories.createUserFactory();

    return async (request: FastifyRequest, reply: FastifyReply) => {
      const parsedBody = schema.parse(request.body);

      try {
        await service.execute(parsedBody);
      } catch (error) {
        if (error instanceof ServiceErrors.EntityAlreadyExist) {
          reply.status(400).send({ error: "User already exists." });
          return;
        }

        throw error;
      }
    };
  }
}
