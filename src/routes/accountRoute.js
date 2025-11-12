import express from "express";
import { fetch, create, getById, getBalanceById } from "../controller/accountController.js";
import { checkConsent } from "../middleware/consentMiddleware.js";

const accountRoute = express.Router();

accountRoute.post("/", create)
accountRoute.get("/", fetch);
accountRoute.get("/:accountId", getById);

accountRoute.get(
   "/:accountId/balance", 
   checkConsent(['BALANCES_READ']), 
   getBalanceById
);

export default accountRoute;