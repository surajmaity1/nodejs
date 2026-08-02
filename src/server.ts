import express from "express";
import { config } from "@/config/config";
import { router } from "@/routes/v1/index";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";

const app = express();
const port = parseInt(config.PORT);

app.use(express.json())
.use(cookieParser())
.use("/v1", router)
.use((req, res) => {
  logger.error(`${req.originalUrl} route not found`);

  return res.status(404).json({
    message: "Route not found"
  });
});

app.listen(port, () => {
  logger.info(`Server running on port:${port}`);
});
