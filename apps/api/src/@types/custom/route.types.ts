import { FastifyReply, FastifyRequest } from "fastify";

export type RouteFunction = (
  request: FastifyRequest,
  reply: FastifyReply
) => Promise<void | any>;
