import { InvestmentPosition } from "./investmentPosition.base.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const CdbDetailsSchema = new Schema({
   rate_type: { type: String, enum: ["CDI", "PERCENTAGE", "PREFIXED"], required: true },
   rate_value: { type: Number, required: true },
   due_date: { type: Date, required: true },
   liquidity: { type: Boolean, required: true }
},
   { _id: false }
);

const CdbSchema = new Schema({
   details: { type: CdbDetailsSchema, required: true }
}, { _id: false });

export const CdbPosition = InvestmentPosition.discriminator("CDB", CdbSchema);