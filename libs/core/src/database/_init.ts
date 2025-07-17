import mongoose from "mongoose";
import z from "zod";

export async function connectDbClient(url: string) {
  if (!z.url().safeParse(url).success) {
    throw new Error("Database URL is invalid. ");
  }

  await mongoose.connect(url);
}
