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
   status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'REVOKED', 'EXPIRED'],
      default: 'ACTIVE'
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