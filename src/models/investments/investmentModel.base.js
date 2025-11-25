import mongoose from "mongoose";
const { Schema, model } = mongoose;

const positionSchema = new Schema({
   _id: { type: String }, 
   accountId: {
      type: String,
      ref: "Account",
      required: true,
      index: true
   },
   customerId: {
      type: String,
      ref: "Customer",
      required: true,
      index: true
   },
   productId: {
      type: String,
      ref: "InvestmentProduct",
      required: true
   },
   investedAmount: { 
      type: Number, 
      required: true, 
      min: 0 
   },
   quantity: { 
      type: Number, 
      default: 1 
   }, 
   purchaseDate: { 
      type: Date, 
      default: Date.now 
   }
}, { timestamps: true });

positionSchema.pre(/^find/, function(next) {
   this.populate({
      path: 'productId',
      select: 'name productType rateType rateValue ticker maturityDate' 
   });
   next();
});

export const InvestmentPosition = model("InvestmentPosition", positionSchema);