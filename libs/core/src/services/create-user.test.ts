import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserService } from "./create-user.js";
import { IMUserRepository } from "@/repositories/in-memory/user.js";
import { createDb, removeDb } from "@/repositories/in-memory/config/default.js";
import { afterEach } from "node:test";
import { createTestUser } from "@/utils/tests/create-user.js";
import { UserCreationType, UserType } from "@/@types/entitites/user.types.js";
import { EntityAlreadyExist } from "./errors/entity-already-exist.js";

let db__id: string;
let rep: IMUserRepository;
let service: CreateUserService;

let test_user_entity: UserType;
let test_user_creation_entity: UserCreationType;

describe("CreateUserService", () => {
  beforeEach(() => {
    db__id = createDb();
    rep = new IMUserRepository(db__id);
    service = new CreateUserService(rep);

    const { creation_entity, entity } = createTestUser();
    test_user_creation_entity = creation_entity;
    test_user_entity = entity;
    rep._getDb().users.push(entity);
  });

  afterEach(() => {
    removeDb(db__id);
  });

  it("should throw EntityAlreadyExist", async () => {
    const promise = service.execute(test_user_creation_entity);
    await expect(promise).rejects.toBeInstanceOf(EntityAlreadyExist);
  });

  it("should not reject promise and create user", async () => {
    const promise = service.execute({
      ...test_user_creation_entity,
      email: "newuseremail@gmail.com",
    });

    await expect(promise).resolves.not.toThrow();
  });

  it("should validate if user password was hashed after creation", async () => {
    const user_email = "newuseremail@gmail.com";

    await service.execute({
      ...test_user_creation_entity,
      email: user_email,
    });

    const users = rep._getDb().users.filter((u) => u.email === user_email);

    expect(users.length).toBe(1);

    const user = users[0];

    expect(user.password).not.toBe(test_user_creation_entity.password);
  });
});
