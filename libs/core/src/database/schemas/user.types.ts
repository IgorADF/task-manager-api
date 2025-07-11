import { InferSchemaType } from "mongoose";
import { userSchema } from "./user.model";

export type UserType = InferSchemaType<typeof userSchema>;
