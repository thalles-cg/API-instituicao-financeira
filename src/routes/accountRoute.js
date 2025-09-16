import express from "express";
import { fetch, create, getById, getTransactionsByAccountId } from "../controller/accountController.js";

const accountRoute = express.Router();

accountRoute.post("/", create)
accountRoute.get("/", fetch);
accountRoute.get("/:id", getById);
accountRoute.get("/:accountId/transactions", getTransactionsByAccountId);

export default accountRoute;