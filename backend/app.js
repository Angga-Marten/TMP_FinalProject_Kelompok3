import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
