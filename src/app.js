import express from "express";
import route from "./routes/customerRoute.js"

const app = express();
app.use(express.json());

app.use("/api/customer/", route)

export default app;