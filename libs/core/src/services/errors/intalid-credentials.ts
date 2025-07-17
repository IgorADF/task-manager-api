import { DefaultError } from "./default";

export class InvalidCredentialsError extends DefaultError {
  constructor() {
    super(`Invalid credentials. `);
  }
}
