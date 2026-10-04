import { config } from "@/config/config";
import { UNAUTHENTICATED_USER, USER_AUTH_ERROR } from "@/constants/auth";
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
        message: UNAUTHENTICATED_USER,
      });
    }

    next();
  } catch (error) {
    logger.error(USER_AUTH_ERROR, error);

    return res.status(401).json({
      message: UNAUTHENTICATED_USER,
    });
  }
};
