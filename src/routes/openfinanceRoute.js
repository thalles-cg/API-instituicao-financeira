import express from "express";
import customerRoute from "./customerRoute.js";
import accountRoute from "./accountRoute.js";
import transactionRoute from "./transactionRoute.js";

const openfinanceRoute = express.Router();

openfinanceRoute.use("/customers", customerRoute);
openfinanceRoute.use("/accounts", accountRoute);
openfinanceRoute.use("/transactions", transactionRoute);

export default openfinanceRoute;