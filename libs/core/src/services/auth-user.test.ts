import { beforeEach, describe, expect, it } from "vitest";
import { IMUserRepository } from "@/repositories/in-memory/user.js";
import { createDb, removeDb } from "@/repositories/in-memory/config/default.js";
import { afterEach } from "node:test";
import { createTestUser } from "@/utils/tests/create-user.js";
import { UserCreationType, UserType } from "@/@types/entitites/user.types.js";
import { AuthUserService } from "./auth-user.js";
import { InvalidCredentialsError } from "./errors/intalid-credentials.js";

let db__id: string;
let rep: IMUserRepository;
let service: AuthUserService;

let test_user_entity: UserType;
let test_user_creation_entity: UserCreationType;

describe("AuthUserService", () => {
  beforeEach(() => {
    db__id = createDb();
    rep = new IMUserRepository(db__id);
    service = new AuthUserService(rep);

    const { creation_entity, entity } = createTestUser();
    test_user_creation_entity = creation_entity;
    test_user_entity = entity;
    rep._getDb().users.push(entity);
  });

  afterEach(() => {
    removeDb(db__id);
  });

  it("Should throw InvalidCredentialsError if a user there is no user with used email", async () => {
    const promise = service.execute(
      "not-in-db-user-email@gmail.com",
      "random-password"
    );
    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should throw InvalidCredentialsError if password is not the same", async () => {
    const promise = service.execute(test_user_entity.email, "random-password");
    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should authenticate user", async () => {
    const user = await service.execute(
      test_user_entity.email,
      test_user_creation_entity.password
    );
    expect(user.id).toBe(test_user_entity.id);
  });
});
