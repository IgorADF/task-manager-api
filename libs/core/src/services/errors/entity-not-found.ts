import { DefaultError } from "./default";

export class EntityNotFoundError extends DefaultError {
  constructor() {
    super(`Entity not found. `);
  }
}
