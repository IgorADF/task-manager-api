import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { UserType } from "@/database/schemas/user.types";
import { UserModel } from "@/database/schemas/user.model";

export class MongoUserRepository implements UserReppositoryInterface {
  async create(data: UserType): Promise<void> {
    await UserModel.create(data);
  }

  async getById(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }

  async getByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
}
