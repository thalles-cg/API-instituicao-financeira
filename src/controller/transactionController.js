import Transaction from "../models/transactionModel.js";

export const create = async (req, res) => {
    console.log(req.body)
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();

        const responseTransaction = {
            ...savedTransaction.toObject(),
            date: savedTransaction.date.toISOString().slice(0, 10) 
        };

        res.status(201).json(responseTransaction);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar transação', details: err.message });
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
      res.status(500).json({error: error.message})
   }
}