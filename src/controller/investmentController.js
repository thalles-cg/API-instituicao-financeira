import * as InvestmentService from "../services/investmentService.js";

export const createInvestment = async (req, res) => {
   try {
      if (!req.body.accountId) {
         return res.status(400).json({ success: false, error: "accountId is required" });
      }

      const investmentData = {
         ...req.body,
         customerId: req.customerId 
      };

      const investment = await InvestmentService.createInvestment(investmentData);

      return res.status(201).json({
         success: true,
         investment
      });

   } catch (error) {
      return res.status(400).json({
         success: false,
         error: "Failed to create investment",
         details: error.message
      });
   }
};

export const getInvestmentById = async (req, res) => {
   const { investmentId } = req.params;
   const investment = await InvestmentService.getInvestmentById(investmentId);

   if (!investment) {
      return res.status(404).json({
         success: false,
         error: "Investment not found"
      });
   }

   return res.json({ success: true, investment });
};

export const getInvestmentsByAccount = async (req, res) => {
   const { accountId } = req.params;
   const investments = await InvestmentService.getInvestmentsByAccountId(accountId);

   return res.json({ success: true, investments });
};


