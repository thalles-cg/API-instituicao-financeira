import express from "express";
import { fetch, create } from "../controller/customerController.js";

const customerRoute = express.Router();

customerRoute.post("/", create)
customerRoute.get("/", fetch);

export default customerRoute;