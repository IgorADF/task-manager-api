import { UserType } from "@/database/schemas/user.types";

export interface UserReppositoryInterface {
  create: (data: UserType) => Promise<void>;
}
