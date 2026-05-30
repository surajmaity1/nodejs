import { createUserController } from "@/controllers/user.controller";
import { createUserValidator } from "@/validators/user";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/", createUserValidator, createUserController);
