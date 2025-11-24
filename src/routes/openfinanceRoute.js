import express from "express";
import customerRoute from "./customerRoute.js";
import accountRoute from "./accountRoute.js";
import transactionRoute from "./transactionRoute.js";
import consentRoute from "./consentRoute.js";
import investmentRoute from "./investmentRoute.js";
import productRoute from "./productRoute.js";

const openfinanceRoute = express.Router();

openfinanceRoute.get("/", (req, res) => {
   res.status(200).json({
      message: "API IF-Thalles", 
      version: "1.0.0", 
      status: "online",
      endpoints: {
         public: [
            "GET /openfinance/",
            "GET /openfinance/customers/lookup/by-cpf/:cpf"
         ],
         consent: [
            "POST /openfinance/consents",
            "GET /openfinance/consents/:consentId",
            "DELETE /openfinance/consents/:consentId"
         ],
         protected: [
            "GET /openfinance/customers/:customerId",
            "GET /openfinance/customers/:customerId/accounts",
            "GET /openfinance/accounts/:accountId/balance",
            "GET /openfinance/transactions/:accountId"
         ]
      }
   });
});

openfinanceRoute.use("/customers", customerRoute);
openfinanceRoute.use("/accounts", accountRoute);
openfinanceRoute.use("/transactions", transactionRoute);
openfinanceRoute.use("/consents", consentRoute);
openfinanceRoute.use("/investments", investmentRoute);
openfinanceRoute.use("/products", productRoute);

export default openfinanceRoute;