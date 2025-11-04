import express from "express";
import { fetch, create, getById, getAccountsById } from "../controller/customerController.js";

const customerRoute = express.Router();

customerRoute.post("/", create)
customerRoute.get("/", fetch);
customerRoute.get("/:id", getById);
customerRoute.get("/:id/accounts", getAccountsById);

export default customerRoute;