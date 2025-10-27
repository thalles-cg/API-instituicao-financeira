import { createCustomer } from "../services/customerService.js";
import Customer from "../models/customerModel.js"

export const create = async (req, res) => {
   try {
      const savedCustomer = await createCustomer(req.body);
      
      res.status(201).json({
         success: true,
         message: "Customer created successfully",
         data: savedCustomer
      });

   } catch (error) {
      if (error.code === 11000) {
         const duplicatedField = Object.keys(error.keyValue)[0];
         if (duplicatedField === 'email') {
            return res.status(400).json({success: false, error: "This email is already registered.", details: error.message  });
         }
         if (duplicatedField === 'cpf') {
            return res.status(400).json({success: false, error: "This CPF is already registered.", details: error.message });
         }
      }
      res.status(500).json({ success: false, error: 'Failed to fetch customers', details: error.message });
  }
};

export const fetch = async (req, res) => {
   try {
      const customers = await Customer.find();

      res.status(200).json({
         success: true,
         message: "Customers sent correctly",
         data: customers
      });
   } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch customers', details: error.message });
   }
}