import mongoose from "mongoose";
import { InvestmentPosition } from "./investmentPosition.base.js";

const { Schema } = mongoose;

const CryptoDetailsSchema = new Schema({
   symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true, 
   },
   name: {
      type: String,
      required: true, 
      trim: true
   },

   network: {
      type: String,
      required: true,
      trim: true 
   },

   quantity: {
      type: Number,
      required: true,
      min: 0
   },

   purchase_price: {
      type: Number,
      required: true,
      min: 0
   },

   total_invested: {
      type: Number, 
      required: true,
      min: 0
   },

   current_price: {
      type: Number,
      required: true,
      min: 0
   },

   accumulated_return: {
      type: Number, 
      default: 0,
      min: 0
   },

   purchase_date: {
      type: Date,
      required: true
   }
},
  { _id: false }
);

const CryptoSchema = new Schema({
   details: {
      type: CryptoDetailsSchema,
      required: true
   }
});

export const CryptoPosition = InvestmentPosition.discriminator(
   "CRYPTO",
   CryptoSchema
);
