import { defineConfig } from "jest";

export default defineConfig({
  verbose: true,
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/prisma/singleton.ts"],
});
