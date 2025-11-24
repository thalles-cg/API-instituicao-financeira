import mongoose from "mongoose";
import { InvestmentPosition } from "../models/investments/investmentModel.base.js";
import { InvestmentProduct } from "../models/products/productModel.base.js";
import CounterService from "./counterService.js";

export const createInvestment = async (data) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const product = await InvestmentProduct.findById(data.productId);
      
      if (!product) {
         throw new Error("Produto de investimento não encontrado ou indisponível.");
      }

      if (!product.active) {
         throw new Error("Este produto não está mais disponível para novas aplicações.");
      }

      if (data.amount < product.minInvestmentAmount) {
            throw new Error(`O investimento mínimo para este produto é R$ ${product.minInvestmentAmount}`);
      }

      const seqNumber = await CounterService.getNextSequence("investment", { session });
      const newId = `inv_${seqNumber}`;

      const newPosition = new InvestmentPosition({
         _id: newId,
         accountId: data.accountId,
         productId: data.productId, // Salva apenas o ID
         investedAmount: data.amount,
         quantity: data.quantity || 1,
         purchaseDate: new Date()
      });

      await newPosition.save({ session });
      await session.commitTransaction();

      return await InvestmentPosition.findById(newId);

   } catch (error) {
      await session.abortTransaction();
      throw error;
   } finally {
      session.endSession();
   }
};

export const getInvestmentsByAccountId = async (accountId) => {
   return await InvestmentPosition.find({ accountId });
};

export const getInvestmentById = async (id) => {
   return await InvestmentPosition.findById(id);
};