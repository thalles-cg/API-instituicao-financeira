import mongoose from 'mongoose';
import CounterService from '../services/counterService.js';
const { Schema, model } = mongoose;

const accountSchema = new Schema({
   _id: {type: String},
   customer: {
    type: String,
    ref: 'Customer',
    required: true
  },
  type: {
    type: String,
    enum: ['checking', 'savings', 'salary', 'investment'],
    required: true
  },
  branch: {
    type: String,
    required: true,
    match: /^[0-9]{4}$/ 
  },
  number: {
    type: String,
    required: true,
    match: /^[0-9]{5}-[0-9]{1}$/ 
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  transactions: [{
      type: String,
      ref: 'Transaction'
    }
  ]
}, {
  timestamps: true
});

accountSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const seqNumber = await CounterService.getNextSequence('account');
      this._id = `acc_${seqNumber}`;
      next();
    } catch (err) {
      next(err); 
    }
  } else {
    next();
  }
});

const Account = model('Account', accountSchema);

export default Account;
