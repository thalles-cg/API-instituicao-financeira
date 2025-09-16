import { createAccount, getAccountById } from "../services/accountService.js";
import Account from "../models/accountModel.js";

export const create = async (req, res) => {
  try {
    const savedAccount = await createAccount(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: savedAccount 
    });
  } catch (err) {
    if (err.message === 'Customer not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    if (err.code === 11000){
      return res.status(400).json({ success: false, error: "This combination of branch and number already exists." });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

export const fetch = async (req, res) => {
   try {
     const accounts = await Account.find().select('_id type branch number balance');

     res.status(200).json({
       success: true,
       message: "Accounts sent correctly",
       data: accounts
     });
   } catch (error) {  
     res.status(500).json({ success: false, error: error.message });
   }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const account = await getAccountById(id);

        if (!account) {
            return res.status(404).json({
                success: false,
                error: 'Account not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Account details sent correctly",
            data: account
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
