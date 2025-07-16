import { DefaultError } from "./_default";

export class EntityNotFoundError extends DefaultError {
  constructor() {
    super(`Entity not found.`);
  }
}
