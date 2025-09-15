import Account from "../models/accountModel.js";
import Customer from "../models/customerModel.js";

export const create = async (req, res) => {
  try {
    const { customer, type, branch, number, balance } = req.body;

    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const newAccount = new Account({
      customer,
      type,
      branch,
      number,
      balance
    });

    const savedAccount = await newAccount.save(); 

    existingCustomer.accounts.push(savedAccount._id);
    await existingCustomer.save();

    const responseAccount = {
      _id: savedAccount._id,
      type: savedAccount.type,
      branch: savedAccount.branch,
      number: savedAccount.number,
      balance: savedAccount.balance,
      transactions: savedAccount.transactions
    };

    res.status(201).json(responseAccount);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create account', details: err.message });
  }
};

export const fetch = async (req, res) => {
   try {
     const accounts = await Account.find().select('-customer -__v -createdAt -updatedAt');

     res.status(200).json({
       success: true,
       message: "Accounts sent correctly",
       data: accounts
     });
   } catch (error) {
     res.status(500).json({error: error.message})
   }
}
