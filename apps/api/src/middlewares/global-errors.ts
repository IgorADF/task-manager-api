import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ServiceErrors } from "lib-core";

export function globalErrorMiddleware(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.error("Error caught:", error);

  if (error instanceof ServiceErrors.DefaultError) {
    reply.status(400).send({
      message: error.message,
      code: error.name,
    });
  } else {
    reply.status(error.statusCode || 500).send({
      message: "An unexpected error occurred.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
