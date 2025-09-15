import Customer from "../models/customerModel.js"

export const create = async (req, res) => {
   try {
      const { email } = req.body;
    
      const customerExist = await Customer.findOne({ email });
      if (customerExist) {
         return res.status(400).json({ message: "Customer already exists." });
      }
      
      const customer = new Customer(req.body);
      const savedCustomer = await customer.save();
      
      res.status(201).json({
         success: true,
         message: "Customer created successfully",
         data: savedCustomer
      });

   } catch (error) {
      res.status(500).json({error: error.message})
   }
}

export const fetch = async (req, res) => {
   try {
      const customers = await Customer.find();

      res.status(200).json({
         success: true,
         message: "Customers sent correctly",
         data: customers
      });
   } catch (error) {
      res.status(500).json({error: error.message})
   }
}