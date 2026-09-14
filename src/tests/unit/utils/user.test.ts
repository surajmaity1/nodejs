import { describe, expect, it } from "vitest";
import { validateUUID } from "@/utils/user";

describe("validateUUID", () => {
  it("should not validate invalid UUID", () => {
    expect(validateUUID("abcd")).toBe(false);
  });

  it("should validate valid UUID", () => {
    expect(validateUUID("e2998e9d-6869-4a77-94e0-7228ad7889e3")).toBe(true);
  });
});
