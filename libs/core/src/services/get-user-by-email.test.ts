import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GetUserByEmailService } from "./get-user-by-email.js";
import { IMUserRepository } from "@/repositories/in-memory/user.js";
import { EntityNotFoundError } from "./errors/entity-not-found.js";
import { createDb, removeDb } from "@/repositories/in-memory/config/default.js";
import { createTestUser } from "@/utils/tests/create-user.js";
import { UserType } from "@/@types/entitites/user.types.js";

let db__id: string;
let rep: IMUserRepository;
let service: GetUserByEmailService;

let test_user_entity: UserType;

describe("GetUserByEmailService", () => {
  beforeEach(() => {
    db__id = createDb();
    rep = new IMUserRepository(db__id);
    service = new GetUserByEmailService(rep);

    const { entity } = createTestUser();
    test_user_entity = entity;
    rep.entities.push(entity);
  });

  afterEach(() => {
    removeDb(db__id);
  });

  it("Should throw EntityNotFoundError", async () => {
    const promise = service.execute("notexistinguser@gmail.com");
    await expect(promise).rejects.toBeInstanceOf(EntityNotFoundError);
  });

  it("Should get user by email", async () => {
    const user = await service.execute(test_user_entity.email);
    expect(user.id).toBeTruthy();
  });
});
