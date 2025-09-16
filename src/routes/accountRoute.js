import express from "express";
import { fetch, create, getById } from "../controller/accountController.js";

const accountRoute = express.Router();

accountRoute.post("/", create)
accountRoute.get("/", fetch);
accountRoute.get("/:id", getById);

export default accountRoute;