import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { toJSON: { virtuals: true, versionKey: false } }
);

export const UserModel = mongoose.model("User", userSchema);

export type UserMongoType = InferSchemaType<typeof userSchema>;
export type UserMongoDoc = HydratedDocument<UserMongoType>;
