import express from "express";
import { create, getByCustomerId, getById, revoke } from "../controller/consentController.js";

const consentRoute = express.Router();

consentRoute.post("/", create)
consentRoute.get("/:id", getById);
consentRoute.get("/customer/:customerId", getByCustomerId);
consentRoute.delete("/:id", revoke);

export default consentRoute;