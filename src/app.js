import express from "express";
import customerRoute from "./routes/customerRoute.js"
import accountRoute from "./routes/accountRoute.js"
import transactionRoute from "./routes/transactionRoute.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "running"
  });
});

app.use("/api/customer/", customerRoute);
app.use("/api/account/", accountRoute);
app.use("/api/transaction/", transactionRoute);

export default app;