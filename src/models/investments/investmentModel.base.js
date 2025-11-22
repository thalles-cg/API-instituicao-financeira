import mongoose from "mongoose";
const { Schema, model } = mongoose;

const baseOptions = {
   discriminatorKey: "productType",
   timestamps: true,
   toJSON: {
      transform: (doc, ret) => {
         delete ret.__v;
      }
   }
};

const InvestmentPositionBaseSchema = new Schema({
   _id: { type: String },
   accountId: {
      type: String,
      ref: "Account",
      required: true,
      index: true
   },
   name: {
      type: String,
      required: true
   },
   institution: {
      type: String,
      required: true,
      index: true
   },
   currentAmount: {
      type: Number,
      required: true,
      min: 0
   },
   purchaseAmount: {
      type: Number,
      required: false, 
      min: 0
   }
}, baseOptions);

export const InvestmentPosition = model(
   "InvestmentPosition",
   InvestmentPositionBaseSchema
);
