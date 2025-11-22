import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const consentSchema = new Schema({
   _id: { type: String }, 
   customerId: {
      type: String,
      ref: 'Customer',
      required: true,
      index: true 
   },
   permissions: [{
      type: String,
      required: true,
      enum: [ 
         'ACCOUNTS_READ',
         'CUSTOMER_DATA_READ',
         'BALANCES_READ',
         'TRANSACTIONS_READ',
         'INVESTMENTS_READ'
      ]
   }],
   status: {
      type: String,
      required: true,
      enum: ['AWAITING_AUTHORIZATION', 'AUTHORIZED', 'REJECTED', 'REVOKED'],
      default: 'AWAITING_AUTHORIZATION'
   },
   creationDateTime: {
      type: Date,
      default: Date.now
   },
   expirationDateTime: {
      type: Date,
      required: true
   },
   revocationDateTime: {
      type: Date
   }
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

const Consent = model('Consent', consentSchema);

export default Consent;