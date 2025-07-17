import { UserCreationType, UserType } from "@/@types/entitites/user.types";
import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { randomUUID } from "node:crypto";
import { InMemoryDB } from "./config/default";

export class IMUserRepository
  extends InMemoryDB
  implements UserReppositoryInterface
{
  constructor(db_id: string) {
    super(db_id);
  }

  async create(data: UserCreationType): Promise<UserType> {
    const new_entity: UserType = {
      ...data,
      id: randomUUID(),
    };

    this._getDb().users.push(new_entity);

    return new_entity;
  }

  async getById(id: string) {
    const user = this._getDb().users.find((user) => user.id === id);
    return user ? user : null;
  }

  async getByEmail(email: string) {
    const user = this._getDb().users.find((user) => user.email === email);
    return user ? user : null;
  }
}
