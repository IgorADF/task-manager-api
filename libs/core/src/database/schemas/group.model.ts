import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    role: { type: String, required: true },
  },
  { _id: false }
);

export type GroupMongoUserType = InferSchemaType<typeof groupSchema>;

export const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    create_by_user: { type: String, required: true },
    is_user_group: { type: Boolean, required: true },
    users: { type: [userSchema], required: true, default: [] },
  },
  { toJSON: { virtuals: true, versionKey: false } }
);

export const GroupModel = mongoose.model("Group", groupSchema);

export type GroupMongoType = InferSchemaType<typeof groupSchema>;
export type GroupMongoDoc = HydratedDocument<GroupMongoType>;
