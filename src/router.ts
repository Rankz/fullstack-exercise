import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

router.get("/transactions", (_req: Request, res: Response) => {
  fs.readFile(
    path.join("../data", "transactions.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      const transactionData = JSON.parse(data);
      res.json(transactionData);
    }
  );
});

router.get("/providers", (_req: Request, res: Response) => {
  fs.readFile(path.join("../data/", "providers.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    const providersData = JSON.parse(data);
    res.json(providersData);
  });
});

export default router;
