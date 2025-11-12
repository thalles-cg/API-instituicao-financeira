import express from "express";
import { fetch, create, getById, getAccountsById, lookupByCpf } from "../controller/customerController.js";
import { checkConsent } from "../middleware/consentMiddleware.js";

const customerRoute = express.Router();

customerRoute.post("/", create)
customerRoute.get("/", fetch);
customerRoute.get("/lookup/by-cpf/:cpf", lookupByCpf);

customerRoute.get(
   "/:customerId", 
   checkConsent(['CUSTOMER_DATA_READ']), 
   getById
);

customerRoute.get(
   "/:customerId/accounts", 
   checkConsent(['ACCOUNTS_READ']), 
   getAccountsById
);

export default customerRoute;