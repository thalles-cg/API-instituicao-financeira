import mongoose from 'mongoose';
import Account from "../models/accountModel.js";
import Customer from "../models/customerModel.js";
import CounterService from './counterService.js';

export const createAccount = async (accountData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customerId, type } = accountData;

    const existingCustomer = await Customer.findById(customerId).session(session);
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }

    const existingAccount = await Account.findOne({ customerId: customerId, type: type }).session(session);
    if (existingAccount) {
      throw new Error(`Customer already has a ${type} account`);
    }

    const seqNumber = await CounterService.getNextSequence('account', { session });
    const newId = `acc_${seqNumber}`;

    const newAccount = new Account({
      ...accountData,
      _id: newId
    });

    const savedAccount = await newAccount.save({ session });
    existingCustomer.accounts.push(savedAccount._id);
    await existingCustomer.save({ session });

    await session.commitTransaction();
    return savedAccount;

  } catch (error) {
    await session.abortTransaction();
    throw error;

  } finally {
    session.endSession();
  }
};

export const getAccountById = async (accountId) => {
    const account = await Account.findById(accountId);

    return account;
};

export const getAccountsByCustomerId = async (customerId) => {
  const accounts = await Account.find({ customerId: customerId });
  return accounts; 
};