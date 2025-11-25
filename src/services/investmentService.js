import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { InvestmentPosition } from "../models/investments/investmentModel.base.js";
import { InvestmentProduct } from "../models/products/productModel.base.js";
import Account from "../models/accountModel.js";
import CounterService from "./counterService.js";
import * as TransactionService from "./transactionService.js";

export const createInvestment = async (data) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const product = await InvestmentProduct.findById(data.productId).session(session);
      
      if (!product) throw new Error("Produto de investimento não encontrado.");
      if (!product.active) throw new Error("Este produto não está disponível.");
      if (data.amount < product.minInvestmentAmount) {
         throw new Error(`O investimento mínimo é R$ ${product.minInvestmentAmount}`);
      }

      const account = await Account.findById(data.accountId).session(session);
      if (!account) throw new Error("Conta não encontrada.");

      const operationId = randomUUID();

      await TransactionService.createTransaction({
         accountId: data.accountId,
         amount: data.amount,
         type: 'debit',
         category: 'INVESTMENT',
         description: `Investimento em ${product.name}`,
         operationId: operationId
   }, session);

      const seqNumber = await CounterService.getNextSequence("investment", { session });
      const newId = `inv_${seqNumber}`;

      const newPosition = new InvestmentPosition({
         _id: newId,
         accountId: data.accountId,
         customerId: account.customerId, 
         productId: data.productId, 
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

export const redeemInvestment = async (data) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const { investmentId, amount, targetAccountId } = data;

      const investment = await InvestmentPosition.findById(investmentId).session(session);
      if (!investment) throw new Error("Investimento não encontrado.");

      if (investment.investedAmount < amount) {
         throw new Error(`Saldo insuficiente. Disponível: R$ ${investment.investedAmount}`);
      }

      const destinationAccountId = targetAccountId || investment.accountId;
      
      const operationId = randomUUID();

      investment.investedAmount -= amount;
      await investment.save({ session });

      await TransactionService.createTransaction({
         accountId: destinationAccountId,
         amount: amount,
         type: 'credit',
         category: 'INVESTMENT_RETURN', 
         description: `Resgate de Investimento`,
         operationId: operationId
      }, session);

      await session.commitTransaction();

      return {
         success: true,
         redeemedAmount: amount,
         remainingAmount: investment.investedAmount,
         operationId
      };

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