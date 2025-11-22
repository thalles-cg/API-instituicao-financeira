import { InvestmentPosition } from "./investmentPosition.base.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const StockDetailsSchema = new Schema({
   ticker: {
      type: String,
      required: true,
      uppercase: true,        
      match: /^[A-Z]{4}\d{1,2}$/ 
   },
   quantity: {
      type: Number,
      required: true,
      min: 0.0001
   },
   avg_price: {
      type: Number,
      required: true,
      min: 0
   },
   current_price: {
      type: Number,
      required: false,
      min: 0
   },
   sector: {
      type: String,
      required: false
   },
   brokerage: {
      type: String,
      required: false
   }
},
  { _id: false }
);

const StockSchema = new Schema({
   details: { type: StockDetailsSchema, required: true }
},
   { _id: false }
);

export const StockPosition = InvestmentPosition.discriminator(
   "STOCK",
   StockSchema
);
