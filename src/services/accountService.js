import Account from "../models/accountModel.js";
import Customer from "../models/customerModel.js";

export const createAccount = async (accountData) => {
    const { customer, type } = accountData;

    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
        throw new Error('Customer not found');
    }

    const existingAccount = await Account.findOne({ customer: customer, type: type });
    if (existingAccount) {
        throw new Error(`Customer already has a ${type} account`);
    }

    const newAccount = new Account(accountData);
    const savedAccount = await newAccount.save(); 

    existingCustomer.accounts.push(savedAccount._id);
    await existingCustomer.save();

    return savedAccount;
};

export const getAccountById = async (accountId) => {
    const account = await Account.findById(accountId);

    return account;
};