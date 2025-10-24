import express from "express";
import openfinanceRoute from "./routes/openfinanceRoute.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "running"
  });
});

app.use("/openfinance", openfinanceRoute);

export default app;