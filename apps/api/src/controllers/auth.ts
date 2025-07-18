import { RouteFunction } from "@/@types/route.types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ServiceFactories, ServiceErrors, Services } from "lib-core";

export class AuthController {
  authUserSession(fastify: FastifyInstance): RouteFunction {
    const { service } = ServiceFactories.authUserFactory();

    return async (request: FastifyRequest, reply: FastifyReply) => {
      const parsedBody = Services.AuthUserSchema.parse(request.body);
      const user = await service.execute(parsedBody.email, parsedBody.password);

      const token = fastify.jwt.sign({ email: user.email, sub: user.id });
      return { token };
    };
  }
}
