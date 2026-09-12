import {
  INVALID_USER_ID,
  USER_DETAILS_FETCH_FAILED,
  USER_FETCHED_SUCCESS,
  USER_NOT_FOUND,
} from "@/constants/auth";
import { INTERNAL_SERVER_ERROR } from "@/constants/global";
import { createUser, findUserByEmail, findUserByUserName } from "@/repositories/user.repository";
import { getUserDetailsByUserId } from "@/services/user.services";
import { UserCreateRequest, UserCreateRequestBody, UserCreateResponse } from "@/types/user";
import logger from "@/utils/logger";
import { validateUUID } from "@/utils/user";
import { Request, Response } from "express";

export const createUserController = async (req: UserCreateRequest, res: UserCreateResponse) => {
  try {
    const userData = req.body as UserCreateRequestBody;
    const { username, email } = userData;

    const userNameExist = await findUserByUserName(username);

    if (userNameExist) {
      return res.status(400).json({
        message: "Username already exist. Try with different username",
      });
    }

    const existUser = await findUserByEmail(email);

    if (existUser) {
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

export const getUserDetailsByUserIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const validUserId = validateUUID(userId as string);

    if (!validUserId) {
      return res.status(400).json({
        message: INVALID_USER_ID,
      });
    }

    const userDetails = await getUserDetailsByUserId(userId as string, true);

    if (!userDetails) {
      return res.status(404).json({
        message: USER_NOT_FOUND,
        data: null,
      });
    }

    return res.status(200).json({
      message: USER_FETCHED_SUCCESS,
      data: userDetails,
    });
  } catch (error) {
    logger.error(USER_DETAILS_FETCH_FAILED, error);
    res.status(500).json({
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
