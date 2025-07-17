import z from "zod";
import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import { DefaultService } from "@/@types/services.types";
import { EntityAlreadyExist } from "./errors/entity-already-exist";
import { hashPassword } from "@/utils/bcrypt";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export class CreateUserService implements DefaultService {
  constructor(private userRepository: UserReppositoryInterface) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const user = await this.userRepository.getByEmail(data.email);
    if (user) throw new EntityAlreadyExist();

    data.password = hashPassword(data.password);

    await this.userRepository.create(data);
    return;
  }
}
