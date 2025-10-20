import Transaction from "../models/transactionModel.js";
import { createTransaction, getTransactionsByAccountId } from '../services/transactionService.js';

export const create = async (req, res) => {
  try {
    const savedTransaction = await createTransaction(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: savedTransaction
    });
  } catch (err) {
    if (err.message === 'Account not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    if (err.message === 'Insufficient funds') {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: 'Failed to create transaction', details: err.message });
  }
};

export const fetch = async (req, res) => {
   try {
      const transactions = await Transaction.find();

      res.status(200).json({
         success: true,
         message: "Transacations sent correctly",
         data: transactions
      });
   } catch (error) {
      res.status(500).json({ success: false, error: error.message })
   }
}

export const getByAccountId = async (req, res) => {
    try {
        const { accountId } = req.params;

        const transactions = await getTransactionsByAccountId(accountId);
        
        res.status(200).json({
            success: true,
            message: "Account statement sent successfully",
            data: transactions
        });

    } catch (error) {
        if (error.message === 'Account not found') {
            return res.status(404).json({ success: false, error: error.message });
        }
        res.status(500).json({ success: false, error: 'Failed to fetch statement', details: error.message });
    }
};