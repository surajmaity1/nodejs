import { prisma } from "@/utils/prisma";
import { Prisma } from "../../generated/prisma/client";

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
    select: {
      id: true,
      name: true,
    },
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
    },
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
    },
  });
};

export const findUserByUserId = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
      isDeleted: false,
    },
    select: {
      id: true,
    }
  })
};

export const findUserDetailsByUserId = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
      isDeleted: false,
    },
    omit: {
      email: true,
      contactNumber: true,
      signInProvider: true,
      signInProviderId: true,
      isDeleted: true,
    }
  })
}