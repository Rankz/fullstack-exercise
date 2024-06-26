import express, { Request, Response } from "express";
import cors from "cors";

import router from "./router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from localhost:3001 || the port number for you react app.
  })
);

app.use(express.json());
app.use(router);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, welcome to the Nous spending report!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
