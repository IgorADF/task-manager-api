import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import z from "zod";
import { EntityNotFoundError } from "./errors/entity-not-found";

export const AuthUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type AuthUserDTO = z.infer<typeof AuthUserSchema>;

export class Service {
  constructor(private userRepository: UserReppositoryInterface) {}

  async execute(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new EntityNotFoundError();
    return user;
  }
}
