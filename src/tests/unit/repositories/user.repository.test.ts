import { createUser } from "@/repositories/user.repository";
import { TEST_USERS } from "@/tests/fixtures/user";
import prisma from "@/utils/__mocks__/prisma";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/utils/prisma");

describe("User Repository", () => {
  describe("createUser", () => {
    it("should create user for valid user data", async () => {
      const testUser = TEST_USERS[0];
      const testUserId = "74ab6f20-0ef2-4469-832f-8eea445103b4";
      prisma.user.create.mockResolvedValue({ ...testUser, id: testUserId });
      expect(await createUser(testUser)).toStrictEqual({ ...testUser, id: testUserId });
    });
  });
});
