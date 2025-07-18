import { UserCreationType, UserType } from "@/@types/entitites/user.types";
import { randomUUID } from "node:crypto";
import { hashPassword } from "../bcrypt";

interface CreateTestUserInterface {
  entity: UserType;
  creation_entity: UserCreationType;
}

export function createTestUser(): CreateTestUserInterface {
  const creation_entity = {
    name: "Test User",
    email: "user@gmail.com",
    password: "password123",
  };

  return {
    entity: {
      id: randomUUID(),
      ...creation_entity,
      password: hashPassword(creation_entity.password),
    },
    creation_entity,
  };
}
