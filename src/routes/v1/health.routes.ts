import { healthController } from "@/controllers/health.controller";
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", healthController);
