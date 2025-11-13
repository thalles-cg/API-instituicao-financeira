import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const accountSchema = new Schema({
   _id: { type: String },
   customerId: {
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
    required: true
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
  timestamps: true,
  toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.customer; 
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

accountSchema.index({ branch: 1, number: 1 }, { unique: true });

const Account = model('Account', accountSchema);

export default Account;
