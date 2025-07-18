import { MongoGroupRepository } from "@/repositories/mongo/group";
import { CreateGroupService, CreateGroupSchema } from "../create-group";

export function createGroupFactory() {
  const rep = new MongoGroupRepository();
  const service = new CreateGroupService(rep);
  return { service, schema: CreateGroupSchema };
}
