import { MongoUserRepository } from "@/repositories/mongo/user";
import { GetUserByEmailService } from "../get-user-by-email";

export function getUserByEmailFactory() {
  const rep = new MongoUserRepository();
  const service = new GetUserByEmailService(rep);
  return { service };
}
