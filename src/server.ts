import express from "express";
import { config } from "@/config/config";
import { router } from "@/routes/v1/index";
import logger from "./utils/logger";

const app = express();
const port = parseInt(config.PORT);

app.use(express.json()).use("/v1", router);

app.listen(port, () => {
  logger.info(`Server running on port:${port}`);
});
