import { PersistancyRepository } from "@/@types/persistency-repository.types";
import { GroupReppositoryInterface } from "../interfaces/group";
import { GroupModel, GroupMongoDoc } from "@/database/schemas/group.model";
import { GroupCreationType, GroupType } from "@/@types/entitites/group.types";

export class MongoGroupRepository
  implements
    PersistancyRepository<GroupMongoDoc, GroupType>,
    GroupReppositoryInterface
{
  entityMapper(doc: GroupMongoDoc): GroupType {
    return {
      id: doc.id,
      title: doc.title,
      description: doc.description,
      create_by_user: doc.create_by_user,
      is_user_group: doc.is_user_group,
      users: doc.users.map((user) => ({
        user_id: user.user_id,
        role: user.role,
      })),
    };
  }

  async create(data: GroupCreationType): Promise<GroupType> {
    const doc = await GroupModel.create(data);
    return this.entityMapper(doc);
  }
}
