import { randomUUID } from "node:crypto";
import { UserType } from "@/@types/entitites/user.types";

interface InMemoryDBProps {
  users: UserType[];
}

const dbs: { [chave: string]: InMemoryDBProps } = {};

export function getDb(db_id: string): InMemoryDBProps {
  return dbs[db_id];
}

export function createDb(): string {
  const db_id = randomUUID();

  dbs[db_id] = {
    users: [],
  };

  return db_id;
}

export function removeDb(db_id: string) {
  delete dbs?.[db_id];
}

export class InMemoryDB {
  constructor(private db_id: string) {}

  _getDb() {
    return getDb(this.db_id);
  }
}
