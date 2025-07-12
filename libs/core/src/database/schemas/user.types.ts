import { HydratedDocument, InferSchemaType } from "mongoose";
import { userSchema } from "./user.model";

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDoc = HydratedDocument<UserType>;
