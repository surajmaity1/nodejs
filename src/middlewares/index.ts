import { router } from "@/routes/v1";
import cookieParser from "cookie-parser";
import express, {Express} from "express";
import cors from "cors";
import { config } from "@/config/config";

const middleware = (app: Express) => {
    app
      .use(cors({
        origin: [config.FRONTEND_BASE_URL],
        credentials: true,
      }))
      .use(express.json())
      .use(cookieParser())
      .use("/v1", router)
      .use((req, res) => {
            return res.status(404).json({
            message: "Route not found",
            });
       })
}

export default middleware;