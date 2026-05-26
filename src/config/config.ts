import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const environmentSchema = z.object({
  ENV: z.enum(["DEVELOPMENT", "TEST", "STAGING", "PRODUCTION"]),
  PORT: z.string().default("8080"),
  DATABASE_URL: z.url(),
});

const environmentVariables = environmentSchema.safeParse(process.env);

if (!environmentVariables.success) {
  console.error(
    "Config validation error: ",
    environmentVariables.error.message,
  );
  throw new Error("Environment variables not valid");
}

export const config: z.infer<typeof environmentSchema> = {
  ENV: environmentVariables.data.ENV,
  PORT: environmentVariables.data.PORT,
  DATABASE_URL: environmentVariables.data.DATABASE_URL,
};
