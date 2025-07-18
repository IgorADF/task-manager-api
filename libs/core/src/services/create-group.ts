import z from "zod";
import { DefaultService } from "@/@types/services.types";
import { GroupReppositoryInterface } from "@/repositories/interfaces/group";

export const CreateGroupSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(0),
  create_by_user: z.string().min(1),
  is_user_group: z.boolean(),
  users: z
    .array(
      z.object({
        user_id: z.string().min(1),
        role: z.enum(["admin", "regular"]),
      })
    )
    .min(1),
});

export type CreateGroupDTO = z.infer<typeof CreateGroupSchema>;

export class CreateGroupService implements DefaultService {
  constructor(private rep: GroupReppositoryInterface) {}

  async execute(data: CreateGroupDTO): Promise<void> {
    await this.rep.create(data);
  }
}
