import mongoose from "mongoose";

export async function connectDbClient(url: string) {
  if (!url) {
    throw new Error("Database URL is required");
  }

  await mongoose.connect(url);
}
