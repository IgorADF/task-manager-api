import { DefaultError } from "./default";

export class EntityAlreadyExist extends DefaultError {
  constructor() {
    super(`Entity already exist. `);
  }
}
