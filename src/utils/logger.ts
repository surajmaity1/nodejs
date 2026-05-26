import { config } from "@/config/config";
import winston from "winston";

const production = config.ENV === "PRODUCTION";

const logger = winston.createLogger({
  level: production ? "info" : "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export default logger;
