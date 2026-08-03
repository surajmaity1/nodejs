import z from "zod";

export const validateUUID = (id: string) => {
  try {
    const validation = z.uuid().safeParse(id);
    return validation.success ? true : false;
  } catch (error) {
    throw error;
  }
};
