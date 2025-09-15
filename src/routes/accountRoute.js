import express from "express";
import { fetch, create } from "../controller/accountController.js";

const accountRoute = express.Router();

accountRoute.post("/", create)
accountRoute.get("/", fetch);

export default accountRoute;