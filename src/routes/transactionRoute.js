import express from "express";
import { fetch, create, getByAccountId } from "../controller/transactionController.js";

const transactionRoute = express.Router();

transactionRoute.post("/", create)
transactionRoute.get("/", fetch);
transactionRoute.get("/:accountId", getByAccountId);

export default transactionRoute;