import logger from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { healthRepository } from "@/repositories/health.repository";

vi.mock("@/utils/prisma", () => {
  return {
    prisma: {
      $queryRaw: vi.fn(),
    },
  };
});

vi.mock("@/utils/logger", () => {
  return {
    logger: {
      error: vi.fn(),
    },
  };
});

const mockPrisma = vi.mocked(prisma);
const mockLogger = vi.mocked(logger);

describe.only("Health Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrun true when DB is UP", async () => {
    mockPrisma.$queryRaw.mockResolvedValueOnce(1);
    const healthStatus = await healthRepository();
    expect(healthStatus).to.be.equal(true);
  });
});
