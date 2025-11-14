import mongoose from 'mongoose';
import { isValidCPF } from '../services/cpfValidatorService.js';
import { isValidEmail } from '../services/emailValidatorService.js';
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  _id: { type: String },
  name: { 
    type: String, 
    required: true, 
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    match: [/^[\p{L} ]+$/u, 'Name must contain only letters and spaces']
  },
  cpf: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\d{11}$/, 'CPF must contain 11 digits.'] 
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

const Customer = model('Customer', customerSchema);

export default Customer;
