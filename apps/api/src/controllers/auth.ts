import { RouteFunction } from "@/@types/custom/route.types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Repositories, Services } from "lib-core";

export class AuthController {
  authenticate(fastify: FastifyInstance): RouteFunction {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const service = Services.AuthUserService;

      const parsedBody = service.AuthUserSchema.parse(request.body);

      const rep = new Repositories.MongoUserRepository();
      const serviceInstance = new service.Service(rep);
      const user = await serviceInstance.execute(parsedBody.email);

      if (user.password !== parsedBody.password) {
        reply.status(401).send({ error: "Invalid credentials. " });
        return;
      }

      const token = fastify.jwt.sign(
        { email: user.email, sub: user._id.toString() },
        { sub: user._id.toString() }
      );

      return { token };
    };
  }
}
