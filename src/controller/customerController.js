import Customer from "../models/customerModel.js"

export const create = async (req, res) => {
   try {
      const { email, cpf } = req.body;
    
      const customerExist = await Customer.findOne({ $or: [{ email }, { cpf }] });

      if (customerExist) {
         if (customerExist.email === email) {
            return res.status(400).json({message: "E-mail já cadastrado."});
         }
         if (customerExist.cpf === cpf){
            return res.status(400).json({message: "CPF já cadastrado."})
         }
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