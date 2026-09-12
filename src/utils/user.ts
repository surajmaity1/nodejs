import z from "zod";

export const validateUUID = (id: string): boolean => {
  try {
    return z.uuid().safeParse(id).success;
  } catch (error) {
    throw error;
  }
};
