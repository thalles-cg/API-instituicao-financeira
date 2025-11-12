import express from "express";
import { create, getByCustomerId, getById, revoke } from "../controller/consentController.js";

const consentRoute = express.Router();

consentRoute.post("/", create)
consentRoute.get("/:consentId", getById);
consentRoute.get("/customer/:customerId", getByCustomerId);
consentRoute.delete("/:consentId", revoke);

export default consentRoute;