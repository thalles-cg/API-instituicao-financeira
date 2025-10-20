import mongoose from "mongoose";
import CounterService from '../services/counterService.js';
const { Schema, model } = mongoose;

const transactionSchema = new mongoose.Schema({
  _id: { type: String },
  accountId: {
    type: String,
    ref: 'Account',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function(value){
        return value > 0;
      },
      message: "Transaction amount must be greater than zero."
    }
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.account;
      
      if (ret.date) {
        ret.date = ret.date.toISOString().slice(0, 10);
      }
    }
  }
}); 

const Transaction = model('Transaction', transactionSchema);

export default Transaction;