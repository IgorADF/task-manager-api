import { DefaultError } from "./_default";

export class EntityAlreadyExist extends DefaultError {
  constructor() {
    super(`User already exist.`);
  }
}
