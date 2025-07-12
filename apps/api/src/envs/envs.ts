import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // ########################################
  // ################ SERVER ################
  // ########################################
  SERVER_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),

  // ########################################
  // ################## DB ##################
  // ########################################
  MONGO_DB_URL: z.string().url(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  throw error;
}

export const envs = data;
export type Envs = z.infer<typeof envSchema>;
