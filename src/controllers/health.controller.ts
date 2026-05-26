import { Request, Response } from "express";

export const healthController = (req: Request, res: Response) => {
  return res.json({
    server: "UP",
    db: "UP",
    timestamp: new Date().toISOString(),
  });
};
