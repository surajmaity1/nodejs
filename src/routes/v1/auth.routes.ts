import { googleCallbackController, googleLoginController } from "@/controllers/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.get("/google/login", googleLoginController);
authRouter.get("/google/callback", googleCallbackController);
