import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { UserModel, UserMongoType } from "@/database/schemas/user.model";
import { UserCreationType, UserType } from "@/@types/entitites/user.types";

export class MongoUserRepository implements UserReppositoryInterface {
  async create(data: UserCreationType): Promise<void> {
    const new_doc: UserMongoType = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    await UserModel.create(new_doc);
  }

  async getById(id: string): Promise<UserType | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  async getByEmail(email: string): Promise<UserType | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}
