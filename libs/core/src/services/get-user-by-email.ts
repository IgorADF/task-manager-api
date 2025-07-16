import z from "zod";
import { DefaultService } from "@/@types/services.types";
import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { EntityNotFoundError } from "./errors/entity-not-found";

export const GetUserByEmailSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type GetUserByEmailDTO = z.infer<typeof GetUserByEmailSchema>;

export class GetUserByEmailService implements DefaultService {
  constructor(private userRepository: UserReppositoryInterface) {}

  async execute(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new EntityNotFoundError();
    return user;
  }
}
