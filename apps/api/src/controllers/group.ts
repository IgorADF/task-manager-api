import { RouteFunction } from "@/@types/route.types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ServiceFactories } from "lib-core";

export class GroupController {
  create(fastify: FastifyInstance): RouteFunction {
    const { service, schema } = ServiceFactories.createGroupFactory();

    return async (request: FastifyRequest, reply: FastifyReply) => {
      const body = {
        ...(request.body as any),
        create_by_user: request.user.sub,
        is_user_group: false,
        users: [
          {
            user_id: request.user.sub,
            role: "admin",
          },
        ],
      };

      const parsedBody = schema.parse(body);
      await service.execute(parsedBody);
    };
  }
}
