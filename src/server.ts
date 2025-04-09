import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT ?? 4000;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello world",
    currentTime: new Date().toUTCString(),
  });
});

app.listen(port, () => console.log(`Server is running in ${port}`));
