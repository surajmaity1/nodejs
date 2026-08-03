// import { createUserController } from "@/controllers/user.controller";
// import { createUserValidator } from "@/validators/user";
import { getUserDetailsByUserIdController } from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";

export const userRouter = Router();

// userRouter.post("/", createUserValidator, createUserController);

userRouter.get("/:userId", authenticate, getUserDetailsByUserIdController);
