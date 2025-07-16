import { MongoUserRepository } from "@/repositories/mongo/user";
import { CreateUserService, CreateUserSchema } from "../create-user";

export function createUserFactory() {
  const rep = new MongoUserRepository();
  const service = new CreateUserService(rep);
  return { service, schema: CreateUserSchema };
}
