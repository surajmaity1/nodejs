import { TEST_USER_PAYLOADS } from "@/tests/fixtures/user";
import { UserCreateRequest, UserCreateResponse } from "@/types/user";
import { createUserValidator } from "@/validators/user";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

describe("User Validators", () => {
  let nextSpy = jest.fn();
  let req: any;
  let res: any;

  beforeEach(() => {
    nextSpy.mockClear();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("createUserValidator", () => {
    it("should validate create user payload for valid data", async () => {
      req = {
        body: TEST_USER_PAYLOADS[0],
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should not validate for empty data", async () => {
      req = {
        body: {},
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Validation failed" }),
      );
    });

    it("should not validate for invalid email", async () => {
      req = {
        body: { ...TEST_USER_PAYLOADS[0], email: "xyz" },
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Validation failed",
          errors: [
            {
              field: "email",
              message: "Invalid email address",
            },
          ],
        }),
      );
    });

    it("should not validate for invalid username", async () => {
      req = {
        body: { ...TEST_USER_PAYLOADS[0], username: "a" },
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Validation failed",
          errors: [
            {
              field: "username",
              message: "Too small: expected string to have >=3 characters",
            },
          ],
        }),
      );
    });

    it("should not validate for invalid name", async () => {
      req = {
        body: { ...TEST_USER_PAYLOADS[0], name: "a" },
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Validation failed",
          errors: [
            {
              field: "name",
              message: "Too small: expected string to have >=3 characters",
            },
          ],
        }),
      );
    });

    it("should not validate for invalid signInProvider", async () => {
      req = {
        body: { ...TEST_USER_PAYLOADS[0], signInProvider: "a" },
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Validation failed",
          errors: [
            {
              field: "signInProvider",
              message:
                'Invalid option: expected one of "GOOGLE"|"LINKEDIN"|"TWITTER"|"MANUAL"',
            },
          ],
        }),
      );
    });

    it("should not validate for unknown field", async () => {
      req = {
        body: { ...TEST_USER_PAYLOADS[0], mango: "mango" },
      };

      await createUserValidator(
        req as UserCreateRequest,
        res as UserCreateResponse,
        nextSpy,
      );

      expect(nextSpy).toHaveBeenCalledTimes(0);
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Validation failed",
          errors: [
            {
              field: "",
              message: 'Unrecognized key: "mango"',
            },
          ],
        }),
      );
    });
  });
});
