import Transaction from "../models/transactionModel.js";
import { createTransaction } from '../services/transactionService.js';

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
         message: "Transcations sent correctly",
         data: transactions
      });
   } catch (error) {
      res.status(500).json({ success: false, error: error.message })
   }
}