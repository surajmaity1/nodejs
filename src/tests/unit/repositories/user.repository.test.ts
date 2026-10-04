import { createUser, findUserDetailsByUserId } from "@/repositories/user.repository";
import { TEST_USERS } from "@/tests/fixtures/user";
import prismaMock from "@/utils/__mocks__/prisma";
import { describe, expect, it, vi } from "vitest";

vi.mock(import("@/utils/prisma"));

describe("User Repository", () => {
  const testUser = TEST_USERS[0];

  describe("createUser", () => {
    it("should create user for valid user data", async () => {
      const testUserId = "74ab6f20-0ef2-4469-832f-8eea445103b4";

      prismaMock.user.create.mockResolvedValue({ ...testUser, id: testUserId });
      expect(await createUser(testUser)).toStrictEqual({ ...testUser, id: testUserId });
    });
  });

  describe("findUserDetailsByUserId", () => {
    it("should find user by user id", async () => {
      prismaMock.user.findUnique.mockResolvedValue(testUser);
      expect(await findUserDetailsByUserId(testUser.id)).toStrictEqual(testUser);
    });
  });
});
