import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import {
  UserModel,
  UserMongoDoc,
  UserMongoType,
} from "@/database/schemas/user.model";
import { UserCreationType, UserType } from "@/@types/entitites/user.types";
import { PersistancyRepository } from "@/@types/persistency-repository.types";

export class MongoUserRepository
  implements
    PersistancyRepository<UserMongoDoc, UserType>,
    UserReppositoryInterface
{
  entityMapper(doc: UserMongoDoc): UserType {
    return {
      id: doc.id,
      email: doc.email,
      name: doc.name,
      password: doc.password,
    };
  }

  async create(data: UserCreationType): Promise<UserType> {
    const new_doc: UserMongoType = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    const doc = await UserModel.create(new_doc);
    return this.entityMapper(doc);
  }

  async getById(id: string): Promise<UserType | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return this.entityMapper(user);
  }

  async getByEmail(email: string): Promise<UserType | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return this.entityMapper(user);
  }
}
