import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { UserType } from "@/database/schemas/user.types";
import { UserModel } from "@/database/schemas/user.model";

export class MongoUserRepository implements UserReppositoryInterface {
  async create(data: UserType): Promise<void> {
    await UserModel.create(data);
  }
}
