import express from "express";
import { fetch, create, getById, getTransactionsByAccountId, getBalanceById } from "../controller/accountController.js";

const accountRoute = express.Router();

accountRoute.post("/", create)
accountRoute.get("/", fetch);
accountRoute.get("/:id", getById);
accountRoute.get("/:id/balance", getBalanceById);
accountRoute.get("/:accountId/transactions", getTransactionsByAccountId);

export default accountRoute;