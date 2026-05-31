import { createUser } from "@/repositories/user.repository";
import { prismaMock } from "@/tests/config/singleton";
import { TEST_USERS } from "../../fixtures/user";
import { describe, it, expect } from "@jest/globals";

describe("User Repository", () => {
  describe("createUser", () => {
    it("should create new user for valid information", async () => {
      prismaMock.user.create.mockResolvedValue(TEST_USERS[0]);
      await expect(createUser(TEST_USERS[0])).resolves.toEqual(TEST_USERS[0]);
    });
  });
});
