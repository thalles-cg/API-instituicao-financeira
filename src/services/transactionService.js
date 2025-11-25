import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';
import Account from '../models/accountModel.js';
import CounterService from './counterService.js';

export const createTransaction = async (transactionData, externalSession = null) => {
  const session = externalSession || await mongoose.startSession();
  
  if (!externalSession) {
    session.startTransaction();
  }

  try {
    const { accountId, amount, type } = transactionData;

    const account = await Account.findById(accountId).session(session);
    if (!account) {
      throw new Error('Account not found');
    }

    if (type === 'debit') {
      if (account.balance < amount) {
        throw new Error('Insufficient funds');
      }
      account.balance -= amount;
    } else if (type === 'credit') {
      account.balance += amount;
    }
    
    const seqNumber = await CounterService.getNextSequence('transaction', { session });
    const newId = `txn_${seqNumber}`;

    const newTransaction = new Transaction({
      ...transactionData,
      _id: newId
    });

    const savedTransaction = await newTransaction.save({ session });
    account.transactions.push(savedTransaction._id);
    await account.save({ session });
    
    if (!externalSession) {
      await session.commitTransaction();
    }
    return savedTransaction;

  } catch (error) {
    if (!externalSession) {
      await session.abortTransaction();
    }
    throw error;

  } finally {
    if (!externalSession) {
      session.endSession();
    }
  }
};

export const getTransactionsByAccountId = async (accountId) => {
  const accountExists = await Account.findById(accountId);
  if (!accountExists) {
    throw new Error('Account not found');
  }

  const transactions = await Transaction.find({ accountId: accountId })
    .sort({ date: -1 }); 

  return transactions;
};