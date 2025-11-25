import express from "express";
import { createInvestment, getInvestmentById, getInvestmentsByAccount, redeemInvestment } from "../controller/investmentController.js";

import { checkConsent } from "../middleware/consentMiddleware.js";

const investmentRoute = express.Router();

investmentRoute.post("/", createInvestment);

investmentRoute.post("/:investmentId/redeem", redeemInvestment);

investmentRoute.get(
   "/accounts/:accountId", 
   checkConsent(["INVESTMENTS_READ"]),
   getInvestmentsByAccount
);

investmentRoute.get(
   "/:investmentId",
   checkConsent(["INVESTMENTS_READ"]),
   getInvestmentById
);

export default investmentRoute;