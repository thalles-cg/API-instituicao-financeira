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

export const getCustomerByCpf = async (cpf) => {
   const customer = await Customer.findOne({ cpf: cpf });
   return customer;
};

export const getCustomerById = async (customerId) => {
  const customer = await Customer.findById(customerId);
  return customer;
};

export const getCustomerAccounts = async (customerId) => {
  const customer = await Customer.findById(customerId).populate('accounts');
  
  if (!customer) {
   return null; 
  }
  
  return customer.accounts;
};