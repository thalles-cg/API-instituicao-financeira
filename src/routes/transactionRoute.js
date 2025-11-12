import express from "express";
import { fetch, create, getByAccountId } from "../controller/transactionController.js";
import { checkConsent } from "../middleware/consentMiddleware.js";

const transactionRoute = express.Router();

transactionRoute.post("/", create)
transactionRoute.get("/", fetch);

transactionRoute.get(
   "/:accountId", 
   checkConsent(['TRANSACTIONS_READ']),
   getByAccountId
);

export default transactionRoute;