import mongoose from "mongoose";

const { Schema } = mongoose;
import { InvestmentPosition } from "./investmentPosition.base.js";

const FiiDetailsSchema = new Schema({
   ticker: {
      type: String,
      required: true,
      uppercase: true,
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

   dividend_yield: {
      type: Number,
      default: 0,
      min: 0
   },

   dividends_received: {
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

const FiiSchema = new Schema({
   details: {
      type: FiiDetailsSchema,
      required: true
   }
});

export const FiiPosition = InvestmentPosition.discriminator("FII", FiiSchema);