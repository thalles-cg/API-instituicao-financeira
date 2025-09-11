import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = model('Counter', counterSchema);

const customerSchema = new Schema({
  _id: { type: String }, 
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  accounts: { type: [String], default: [] }
});

customerSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'customerId' },      
      { $inc: { seq: 1 } },       
      { new: true, upsert: true } 
    );

    const seqNumber = counter.seq.toString().padStart(3, '0'); 
    this._id = `cus_${seqNumber}`;
  }
  next();
});

const Customer = model('Customer', customerSchema);

export default Customer;
