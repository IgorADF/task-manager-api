import { UserCreationType, UserType } from "@/@types/entitites/user.types";

export interface UserReppositoryInterface {
  create: (data: UserCreationType) => Promise<UserType>;
  getById: (id: string) => Promise<UserType | null>;
  getByEmail: (email: string) => Promise<UserType | null>;
}
