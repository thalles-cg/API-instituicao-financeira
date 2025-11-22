import mongoose from "mongoose";
import { InvestmentPosition } from "./investmentPosition.base.js";

const { Schema } = mongoose;

const FundDetailsSchema = new Schema({
   fund_name: {
      type: String,
      required: true,
      trim: true
   },

   cnpj: {
      type: String,
      required: true,
      match: /^\d{14}$/
   },

   quota_value: {
      type: Number,
      required: true,
      min: 0
   },

   quantity: {
      type: Number,
      required: true,
      min: 0
   },

   total_invested: {
      type: Number,
      required: true,
      min: 0
   },

   admin_fee: {
      type: Number, 
      required: true,
      min: 0
   },

   performance_fee: {
      type: Number, 
      default: 0,
      min: 0
   },

   accumulated_return: {
      type: Number, 
      default: 0,
      min: 0
   },

   last_update: {
      type: Date,
      required: true
   }
},
  { _id: false }
);

const FundSchema = new Schema({
   details: {
      type: FundDetailsSchema,
      required: true
   }
});

export const FundPosition = InvestmentPosition.discriminator(
   "FUNDS", 
   FundSchema
);
