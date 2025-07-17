import { DefaultService } from "@/@types/services.types";
import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { InvalidCredentialsError } from "./errors/intalid-credentials";
import { comparePassword } from "@/utils/bcrypt";

export class AuthUserService implements DefaultService {
  constructor(private userRepository: UserReppositoryInterface) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const is_same_password = await comparePassword(password, user.password);
    if (!is_same_password) throw new InvalidCredentialsError();

    return user;
  }
}
