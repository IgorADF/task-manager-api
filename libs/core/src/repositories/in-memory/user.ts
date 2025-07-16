import { UserCreationType, UserType } from "@/@types/entitites/user.types";
import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { randomUUID } from "node:crypto";
import { InMemoryDB } from "./config/default";

export class IMUserRepository
  extends InMemoryDB
  implements UserReppositoryInterface
{
  entities: UserType[] = [];

  constructor(db_id: string) {
    super(db_id);
  }

  async create(data: UserCreationType): Promise<void> {
    const new_entity: UserType = {
      ...data,
      id: randomUUID(),
    };

    this.entities.push(new_entity);
  }

  async getById(id: string) {
    const user = this.entities.find((user) => user.id.toString() === id);
    return user ? user : null;
  }

  async getByEmail(email: string) {
    const user = this.entities.find((user) => user.email.toString() === email);
    return user ? user : null;
  }
}
