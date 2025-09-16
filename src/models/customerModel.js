import mongoose from 'mongoose';
import { isValidCPF } from '../services/cpfValidatorService.js';
import { isValidEmail } from '../services/emailValidatorService.js';
import CounterService from '../services/counterService.js';
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  cpf: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: isValidCPF,
      message: props => `${props.value} is not a valid CPF!`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidEmail,
      message: props => `${props.value} is not a valid e-mail!`
    }
  },
  accounts: [{ type: String, ref: 'Account' }]
}, {
  timestamps: true,
   toJSON: {
    transform: function (doc, ret) {
      delete ret.__v; 
      delete ret.createdAt; 
      delete ret.updatedAt; 
    }
  }
});

customerSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const seqNumber = await CounterService.getNextSequence('customer');
      this._id = `cus_${seqNumber}`;
      next();
    } catch (err) {
      next(err); 
    }
  } else {
    next();
  }
});


const Customer = model('Customer', customerSchema);

export default Customer;
