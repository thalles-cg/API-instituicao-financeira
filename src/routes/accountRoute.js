import express from "express";
import { fetch, create, getById, getTransactionsByAccountId, getBalanceById } from "../controller/accountController.js";

const accountRoute = express.Router();

accountRoute.post("/", create)
accountRoute.get("/", fetch);
accountRoute.get("/:accountId", getById);
accountRoute.get("/:accountId/balance", getBalanceById);

export default accountRoute;