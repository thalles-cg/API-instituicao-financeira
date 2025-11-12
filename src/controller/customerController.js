import { createCustomer, getAllCustomers, getCustomerById, getCustomerAccounts, getCustomerByCpf } from "../services/customerService.js";

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
      res.status(500).json({ success: false, error: 'Failed to create customer', details: error.message });
  }
};

export const fetch = async (req, res) => {
   try {
      const customers = await getAllCustomers();

      res.status(200).json({
         success: true,
         message: "Customers sent correctly",
         data: customers
      });
   } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch customers', details: error.message });
   }
}

export const getById = async (req, res) => {
   try {
      const { customerId } = req.params;
      const customer = await getCustomerById(customerId);

      if(!customer){
         return res.status(404).json({ success: false, message: "Customer not found" })
      }

      res.status(200).json({
         success: true,
         message: "Customer sent correctly",
         data: customer
      });
   } catch (error) {
      if (error.name === 'CastError') { 
         return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }

      res.status(500).json({ success: false, error: 'Failed to fetch customer', details: error.message });
   }
}

export const getAccountsById = async (req, res) => {
   try {
      const { customerId } = req.params;
      const accounts = await getCustomerAccounts(customerId);

      if(accounts === null){
         return res.status(404).json({ success: false, message: "Customer not found" })
      }

      res.status(200).json({
         success: true,
         message: "Customer's accounts sent correctly",
         data: accounts
      });
   } catch (error) {
      if (error.name === 'CastError') {
         return res.status(400).json({ success: false, error: 'Invalid ID format' });
      }

      res.status(500).json({ success: false, error: 'Failed to fetch customer\'s accounts', details: error.message });
   }
}

export const lookupByCpf = async (req, res) => {
   try {
      const { cpf } = req.params;
      const customer = await getCustomerByCpf(cpf);

      if(!customer){
         return res.status(404).json({ success: false, message: "Customer not found" })
      }

      res.status(200).json({
         _id: customer._id,
         cpf: customer.cpf
      });
   } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to lookup customer', details: error.message });
   }
}