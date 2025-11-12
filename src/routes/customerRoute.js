import express from "express";
import { fetch, create, getById, getAccountsById, lookupByCpf } from "../controller/customerController.js";

const customerRoute = express.Router();

customerRoute.post("/", create)
customerRoute.get("/", fetch);
customerRoute.get("/lookup/by-cpf/:cpf", lookupByCpf);
customerRoute.get("/:customerId", getById);
customerRoute.get("/:customerId/accounts", getAccountsById);

export default customerRoute;