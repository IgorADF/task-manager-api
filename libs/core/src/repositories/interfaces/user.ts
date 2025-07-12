import { UserDoc, UserType } from "@/database/schemas/user.types";

export interface UserReppositoryInterface {
  create: (data: UserType) => Promise<void>;
  getById: (id: string) => Promise<UserDoc | null>;
  getByEmail: (email: string) => Promise<UserDoc | null>;
}
