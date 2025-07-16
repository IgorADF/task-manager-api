import { MongoUserRepository } from "@/repositories/mongo/user";
import { AuthUserService } from "../auth-user";

export function authUserFactory() {
  const rep = new MongoUserRepository();
  const service = new AuthUserService(rep);
  return { service };
}
