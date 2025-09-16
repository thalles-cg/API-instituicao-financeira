import { createAccount } from "../services/accountService.js";
import Account from "../models/accountModel.js";

export const create = async (req, res) => {
  try {
    const savedAccount = await createAccount(req.body);

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
    if (err.message === 'Customer not found') {
      return res.status(404).json({error: err.message})
    }
    if (err.code === 11000){
      return res.status(400).json({error: "This combination of branch and number already exists."})
    }
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
