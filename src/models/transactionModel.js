import mongoose from "mongoose";
import CounterService from '../services/counterService.js';
const { Schema, model } = mongoose;

const transactionSchema = new mongoose.Schema({
  _id: { type: String },
  account: {
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
    min: 0
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
});

transactionSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const seqNumber = await CounterService.getNextSequence('transaction');
      this._id = `txn_${seqNumber}`;
      next();
    } catch (err) {
      next(err); 
    }
  } else {
    next();
  }
});


const Transaction = model('Transaction', transactionSchema);

export default Transaction;