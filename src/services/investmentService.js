import mongoose from "mongoose";
import { InvestmentPosition } from "../models/investments/investmentModel.base.js";
import CounterService from "./counterService.js";

export const createInvestment = async (data) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const seqNumber = await CounterService.getNextSequence("investment", { session });
      const newId = `inv_${seqNumber}`;

      const newInvestment = new InvestmentPosition({
         ...data,
         _id: newId
      });

      const saved = await newInvestment.save({ session });

      await session.commitTransaction();

      return saved;

   } catch (error) {
      await session.abortTransaction();
      throw error;

   } finally {
      session.endSession();
   }
};

export const getInvestmentById = async (id) => {
   return await InvestmentPosition.findById(id);
};

export const getInvestmentsByAccountId = async (accountId) => {
   return await InvestmentPosition.find({ accountId });
};
