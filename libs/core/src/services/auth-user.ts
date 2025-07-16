import { DefaultService } from "@/@types/services.types";
import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { EntityNotFoundError } from "./errors/entity-not-found";

export class AuthUserService implements DefaultService {
  constructor(private userRepository: UserReppositoryInterface) {}

  async execute(email: string) {
    const user = await this.userRepository.getById(email);
    if (!user) throw new EntityNotFoundError();
    return user;
  }
}
