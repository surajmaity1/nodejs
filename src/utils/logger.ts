import { config } from "@/config/config";
import winston from "winston";

const logger = winston.createLogger({
  level: config.ENV === "PRODUCTION" ? "info" : "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
  silent: config.ENV === "TEST",
});

export default logger;
