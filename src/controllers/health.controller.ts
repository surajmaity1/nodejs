import { HealthStatus } from "@/constants/customStatus";
import { healthRepository } from "@/repositories/health.repository";
import { HealthResponse } from "@/types/health";
import logger from "@/utils/logger";
import { Request, Response } from "express";

export const healthController = async (req: Request, res: Response) => {
  try {
    const healthResponse = await healthRepository();

    const response: HealthResponse = {
      application: HealthStatus.UP,
      db: HealthStatus.UP,
      timestamp: new Date().toISOString(),
    };

    if (!healthResponse) {
      response.db = HealthStatus.DOWN;
    }

    return res.status(200).json(response);
  } catch (error) {
    logger.error("Error while fetching health controller", error);

    const response: HealthResponse = {
      application: HealthStatus.DOWN,
      db: HealthStatus.DOWN,
      timestamp: new Date().toISOString(),
    };

    return res.status(503).json(response);
  }
};
