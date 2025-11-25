import * as InvestmentService from "../services/investmentService.js";

export const createInvestment = async (req, res) => {
   try {
      const { accountId, productId, amount, quantity } = req.body;

      if (!accountId || !productId || !amount) {
         return res.status(400).json({ 
            success: false, 
            error: "Campos obrigatórios: 'accountId', 'productId' e 'amount'." 
         });
      }

      if (amount <= 0) {
         return res.status(400).json({ 
            success: false, 
            error: "O valor do investimento (amount) deve ser positivo." 
         });
      }

      const investmentData = {
         accountId,
         productId,
         amount,
         quantity: quantity || 1
      };

      const investment = await InvestmentService.createInvestment(investmentData);

      return res.status(201).json({
         success: true,
         investment
      });

   } catch (error) {
      const statusCode = error.message.includes("não encontrado") || error.message.includes("mínimo") ? 400 : 500;
      
      return res.status(statusCode).json({
         success: false,
         error: "Falha ao realizar investimento",
         details: error.message
      });
   }
};

export const redeemInvestment = async (req, res) => {
   try {
      const { investmentId } = req.params;
      const { amount, targetAccountId } = req.body;

      if (!amount || amount <= 0) {
         return res.status(400).json({ 
            success: false, 
            error: "O valor do resgate deve ser positivo." 
         });
      }

      const result = await InvestmentService.redeemInvestment({
         investmentId,
         amount,
         targetAccountId 
      });

      return res.status(200).json({
         success: true,
         message: "Resgate realizado com sucesso.",
         data: result
      });

   } catch (error) {
      const statusCode = error.message.includes("não encontrado") || 
         error.message.includes("insuficiente") ? 400 : 500;

      return res.status(statusCode).json({ 
         success: false, 
         error: error.message 
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


