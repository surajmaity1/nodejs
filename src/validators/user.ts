import { SOMETHING_WENT_WRONG } from "@/constants/global";
import { UserCreateRequest, UserCreateResponse } from "@/types/user";
import logger from "@/utils/logger";
import { NextFunction } from "express";
import z from "zod";

const createUserSchema = z.strictObject({
  username: z.string().min(3),
  email: z.email(),
  contactNumber: z.number().int().positive().optional(),
  name: z.string(),
  image: z.url().optional(),
  signInProvider: z.enum(["GOOGLE", "LINKEDIN", "TWITTER", "MANUAL"]),
});

export const createUserValidator = async (
  req: UserCreateRequest,
  res: UserCreateResponse,
  next: NextFunction,
) => {
  try {
    const validatorResponse = createUserSchema.safeParse(req.body);

    if (!validatorResponse.success) {
      const errors = validatorResponse.error.issues;

      logger.error("Invalid create user payload", errors);
      return res.status(400).json({
        message: "Validation failed",
        errors: validatorResponse.error.issues,
      });
    }

    next();
  } catch (error) {
    logger.error("Error while validating create user payload", error);
    res.status(500).json({ message: SOMETHING_WENT_WRONG });
  }
};
