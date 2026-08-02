import { INTERNAL_SERVER_ERROR } from "@/constants/global";
import { createUser, findUserByEmail, findUserByUserName } from "@/repositories/user.repository";
import { UserCreateRequest, UserCreateRequestBody, UserCreateResponse } from "@/types/user";
import logger from "@/utils/logger";

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
