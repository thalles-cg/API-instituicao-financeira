import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';
import Account from '../models/accountModel.js';

export const createTransaction = async (transactionData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { account: accountId, amount, type } = transactionData;

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

    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save({ session });
    
    account.transactions.push(savedTransaction._id);

    await account.save({ session });
    
    await session.commitTransaction();
    return savedTransaction;

  } catch (error) {
    await session.abortTransaction();
    throw error;

  } finally {
    session.endSession();
  }
};

export const getTransactionsByAccountId = async (accountId) => {
  const accountExists = await Account.findById(accountId);
  if (!accountExists) {
    throw new Error('Account not found');
  }

  const transactions = await Transaction.find({ account: accountId })
    .sort({ date: -1 }); 

  return transactions;
};