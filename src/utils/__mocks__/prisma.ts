import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { PrismaClient } from "../../../generated/prisma/client";

beforeEach(() => {
  mockReset(prismaMock);
});

const prismaMock = mockDeep<PrismaClient>();

export default prismaMock;
