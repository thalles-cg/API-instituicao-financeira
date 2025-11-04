import mongoose from 'mongoose';
import Customer from "../models/customerModel.js";
import CounterService from './counterService.js';

export const createCustomer = async (customerData) => {
   const session = await mongoose.startSession();
   
   session.startTransaction();

   try {
      const seqNumber = await CounterService.getNextSequence('customer', { session });
      const newId = `cus_${seqNumber}`;

      const newCustomer = new Customer({
         ...customerData,
         _id: newId
      });
      
      const savedCustomer = await newCustomer.save({ session });

      await session.commitTransaction();
      
      return savedCustomer;

   } catch (error) {
      await session.abortTransaction();
      
      throw error;

   } finally {
      session.endSession();
   }
};

export const getAllCustomers = async () => {
  return await Customer.find();
};


export const getCustomerById = async (id) => {
  const customer = await Customer.findById(id);
  return customer;
};

export const getCustomerAccounts = async (id) => {
  const customer = await Customer.findById(id).populate('accounts');
  
  if (!customer) {
   return null; 
  }
  
  return customer.accounts;
};