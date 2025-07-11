import { UserReppositoryInterface } from "@/repositories/interfaces/user";
import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export class Service {
  constructor(private userRepository: UserReppositoryInterface) {}

  async execute(data: CreateUserDTO): Promise<void> {
    await this.userRepository.create(data);
  }
}
