import { User } from "@/types/user";
import { prisma } from "@/utils/prisma";

export const createUser = async (user: User) => {
  return await prisma.user.create({
    data: user,
    omit: {
      signInProvider: true,
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
  });
};
