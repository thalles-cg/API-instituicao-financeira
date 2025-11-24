import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productBaseOptions = {
   discriminatorKey: "productType",
   timestamps: true,
   toJSON: {
      transform: (doc, ret) => {
         delete ret.__v;
         ret.id = ret._id;
      }
   }
};

const InvestmentProductSchema = new Schema({
   _id: { type: String },
   name: { 
      type: String, 
      required: true,
      trim: true 
   },
   institution: { 
      type: String, 
      required: true,
      default: "IF-Thalles" 
   },
   active: {
      type: Boolean,
      default: true 
   },
   riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "AGGRESSIVE"],
      required: true
   },
   minInvestmentAmount: {
      type: Number,
      default: 0.01
   }
}, productBaseOptions);

export const InvestmentProduct = model("InvestmentProduct", InvestmentProductSchema);