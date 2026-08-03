import { config } from "@/config/config";
import { getUserDetailsByUserId } from "@/services/user.services";
import { verifyToken } from "@/utils/jwt";
import logger from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[config.ACCESS_TOKEN_NAME] as string;
    const { userId } = verifyToken(token);

    const user = await getUserDetailsByUserId(userId, false);

    if (!user) {
      return res.status(401).json({
        message: "Unauthenticated user",
      });
    }

    next();
  } catch (error) {
    logger.error("Error while validating ", error);
    next(error);
  }
};
