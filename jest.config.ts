import { defineConfig } from "jest";

export default defineConfig({
  verbose: true,
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/config/singleton.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ['<rootDir>/jest.setup.ts']
});
