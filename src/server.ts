import express from "express";
import { config } from "@/config/config";
import { router } from "@/routes/v1/index";

const app = express();
const port = parseInt(config.PORT);

app.use("/v1", router);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
