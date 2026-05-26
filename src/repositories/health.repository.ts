import logger from "@/utils/logger";
import { prisma } from "@/utils/prisma";

export const healthRepository = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return true;
  } catch (error) {
    logger.error("Error while checking db connection", error);
    return false;
  }
};
