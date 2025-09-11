import express from "express";
import { fetch, create } from "../controller/customerController.js";

const route = express.Router();

route.post("/", create)
route.get("/", fetch);

export default route;