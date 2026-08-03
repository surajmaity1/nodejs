import {
  createUser,
  findUserByEmail,
  findUserByUserId,
  findUserDetailsByUserId,
} from "@/repositories/user.repository";
import { UserDetails } from "@/types/auth";
import { Prisma } from "../../generated/prisma/client";

export const createOrUpdateUserDetails = async (userData: UserDetails) => {
  try {
    const existUser = await findUserByEmail(userData.email);

    if (existUser) {
      return existUser;
    }

    const userDetails: Prisma.UserCreateInput = {
      signInProviderId: userData.id,
      name: userData.name,
      email: userData.email,
      image: userData.picture,
      signInProvider: "GOOGLE",
    };

    return await createUser(userDetails);
  } catch (error) {
    throw error;
  }
};

export const getUserDetailsByUserId = async (userId: string, includeDetails: boolean) => {
  try {
    if (includeDetails) {
      return await findUserDetailsByUserId(userId);
    }
    return await findUserByUserId(userId);
  } catch (error) {
    throw error;
  }
};
