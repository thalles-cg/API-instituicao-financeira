import mongoose from "mongoose";
import { InvestmentPosition } from "./investmentPosition.base.js";

const { Schema } = mongoose;

const TreasuryDetailsSchema = new Schema({
   bond_type: {
      type: String,
      required: true,
      enum: ["SELIC", "IPCA", "PRE"],
   },

   maturity_date: {
      type: Date,
      required: true,
   },

   purchase_date: {
      type: Date,
      required: true,
   },

   purchase_price: {
      type: Number,
      required: true,
      min: 0,
   },

   current_unit_price: {
      type: Number,
      required: true,
      min: 0,
   },

   quantity: {
      type: Number,
      required: true,
      min: 0,
   },

   total_invested: {
      type: Number,
      required: true,
      min: 0,
   },

   custody_fee: {
      type: Number, 
      required: true,
      min: 0,
   },

   indexer: {
      type: String,
      enum: ["SELIC", "IPCA", "PRE"],
      required: true
   },

   fixed_rate: {
      type: Number,
      required: function () {
         return this.indexer === "PRE" || this.indexer === "IPCA";
      },
      min: 0
   },

   plus_rate: {
      type: Number,
      required: function () {
         return this.indexer === "IPCA";
      },
      min: 0
   },

   accumulated_return: {
      type: Number,
      default: 0,
      min: 0
   }
},
  { _id: false }
);

const TreasurySchema = new Schema({
   details: {
      type: TreasuryDetailsSchema,
      required: true,
   }
});

export const TreasuryPosition = InvestmentPosition.discriminator(
   "TREASURY",
   TreasurySchema
);
