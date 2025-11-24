import mongoose from "mongoose";
import { InvestmentProduct } from "./productModel.base.js";

const { Schema } = mongoose;

const CdbProductSchema = new Schema({
   rateType: { 
      type: String, 
      enum: ["CDI", "PERCENTAGE", "PREFIXED", "IPCA"], 
      required: true 
   },
   rateValue: { type: Number, required: true }, 
   maturityDate: { type: Date, required: true },
   liquidity: { type: String, default: "No Maturity" },
   issuer: { type: String, required: true } 
});

const StockProductSchema = new Schema({
   ticker: { 
      type: String, 
      required: true, 
      unique: true, 
      uppercase: true,
      trim: true,
      match: /^[A-Z]{4}\d{1,2}$/ 
   },
   sector: { type: String }, 
   cnpj: { type: String } 
});

const CryptoProductSchema = new Schema({
   symbol: { 
      type: String, 
      required: true, 
      uppercase: true, 
      trim: true 
   },
   network: { 
      type: String, 
      required: true, 
      trim: true 
   },
   description: { type: String } 
});

const FiiProductSchema = new Schema({
   ticker: { 
      type: String, 
      required: true, 
      unique: true, 
      uppercase: true 
   },
   admin: { type: String },
   segment: { type: String } 
});

const FundProductSchema = new Schema({
   cnpj: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^\d{14}$/ 
   },
   adminFee: { type: Number, required: true, min: 0 },
   performanceFee: { type: Number, default: 0, min: 0 }, 
   category: { type: String } 
});

const TreasuryProductSchema = new Schema({
   bondType: { 
      type: String, 
      required: true, 
      enum: ["SELIC", "IPCA", "PRE"] 
   },
   maturityDate: { type: Date, required: true },
   indexer: { 
      type: String, 
      enum: ["SELIC", "IPCA", "PRE"], 
      required: true 
   },
   couponRate: { type: Number, default: 0 } 
});

export const CdbProduct = InvestmentProduct.discriminator("CDB", CdbProductSchema);
export const StockProduct = InvestmentProduct.discriminator("STOCK", StockProductSchema);
export const CryptoProduct = InvestmentProduct.discriminator("CRYPTO", CryptoProductSchema);
export const FiiProduct = InvestmentProduct.discriminator("FII", FiiProductSchema);
export const FundProduct = InvestmentProduct.discriminator("FUNDS", FundProductSchema);
export const TreasuryProduct = InvestmentProduct.discriminator("TREASURY", TreasuryProductSchema);