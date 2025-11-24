import express from "express";
import { listProducts, getProductById } from "../controller/productController.js";

const productRoute = express.Router();

productRoute.get("/", listProducts);

productRoute.get("/:productId", getProductById);

export default productRoute;