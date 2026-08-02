import { prisma } from "@/utils/prisma";
import { Prisma } from "../../generated/prisma/client";

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
    select: {
      id: true,
      name: true,
    }
  });
};

export const findUserByUserName = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      isDeleted: false,
      username,
    },
    select: {
      email: true,
    }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      isDeleted: false,
      email,
    },
    select: {
      id: true,
      name: true,
    }
  });
};
