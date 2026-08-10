import { config } from "@/config/config";
import logger from "./utils/logger";
import app from "./app";

const port = parseInt(config.PORT);

app.listen(port, () => {
  logger.info(`Server running on port:${port}`);
});
