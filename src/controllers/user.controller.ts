import { INTERNAL_SERVER_ERROR } from "@/constants/global";
import {
  createUser,
  findUserByEmail,
  findUserByUserName,
} from "@/repositories/user.repository";
import logger from "@/utils/logger";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { username, email } = userData;

    const UserNameAlreadyExist = await findUserByUserName(username);

    if (UserNameAlreadyExist) {
      return res.status(400).json({
        message: "Username already exist. Try with different username",
      });
    }

    const alreadyExistUser = await findUserByEmail(email);

    if (alreadyExistUser) {
      return res.status(400).json({
        message: "User already exist. Try with different email",
      });
    }

    const user = await createUser(userData);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    logger.error("Error while creating user", error);
    res.status(500).json({
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
