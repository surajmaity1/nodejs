import z from "zod";
import dotenv from "dotenv";

dotenv.config({override: true});

const environmentSchema = z.object({
  ENV: z.enum(["DEVELOPMENT", "TEST", "STAGING", "PRODUCTION"]),
  PORT: z.string().default("8000"),
  DATABASE_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.url(),
  FRONTEND_BASE_URL: z.url(),
  COOKIE_DOMAIN: z.string(),
  ACCESS_TOKEN_LIFETIME: z.string(),
  REFRESH_TOKEN_LIFETIME: z.string(),
  PRIVATE_KEY: z.string(),
  PUBLIC_KEY: z.string(),
  ALGORITHM: z.string().default("RS256"),
  ACCESS_TOKEN_NAME: z.string(),
  REFRESH_TOKEN_NAME: z.string(),
});

const environmentVariables = environmentSchema.safeParse(process.env);

if (!environmentVariables.success) {
  console.error("Config validation error: ", environmentVariables.error.message);
  throw new Error("Environment variables not valid");
}

export const config: z.infer<typeof environmentSchema> = {
  ENV: environmentVariables.data.ENV,
  PORT: environmentVariables.data.PORT,
  DATABASE_URL: environmentVariables.data.DATABASE_URL,
  GOOGLE_CLIENT_ID: environmentVariables.data.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: environmentVariables.data.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: environmentVariables.data.GOOGLE_REDIRECT_URI,
  FRONTEND_BASE_URL: environmentVariables.data.FRONTEND_BASE_URL,
  COOKIE_DOMAIN: environmentVariables.data.COOKIE_DOMAIN,
  ACCESS_TOKEN_LIFETIME: environmentVariables.data.ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME: environmentVariables.data.REFRESH_TOKEN_LIFETIME,
  PRIVATE_KEY: environmentVariables.data.PRIVATE_KEY,
  PUBLIC_KEY: environmentVariables.data.PUBLIC_KEY,
  ALGORITHM: environmentVariables.data.ALGORITHM,
  ACCESS_TOKEN_NAME: environmentVariables.data.ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME: environmentVariables.data.REFRESH_TOKEN_NAME,
};
