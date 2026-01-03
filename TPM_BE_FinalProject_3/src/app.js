import express from "express";

const app = express();

app.use(express.json());

import registerRouter from "./routes/register.route.js";

app.use("/api/register", registerRouter);

export default app;