import { prisma } from "@/utils/prisma";
import { Prisma } from "../../generated/prisma/client";

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
    omit: {
      signInProvider: true,
      signInProviderId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    }
  });
};

export const findUserByUserName = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      isDeleted: false,
      username,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      isDeleted: false,
      email,
    },
    omit: {
      signInProvider: true,
      signInProviderId: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    }
  });
};
