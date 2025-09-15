import express from "express";
import { fetch, create } from "../controller/transactionController.js";

const transactionRoute = express.Router();

transactionRoute.post("/", create)
transactionRoute.get("/", fetch);

export default transactionRoute;