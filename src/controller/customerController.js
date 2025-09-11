import Customer from "../models/customerModel.js"

export const create = async (req, res) => {
   try {
      const customerData = new Customer(req.body)
      const {email} = customerData;

      const customerExist = await Customer.findOne({email});
      if (customerExist){
         return res.status(400).json({message: "Customer already exist."})
      }
   } catch (error) {
      res.status(500).json({error: "Internal Server Error."})
   }
}

export const fetch = async (req, res) => {
   try {
      return res.json("OK")
   } catch (error) {
      res.status(500).json({error: "Internal Server Error."})
   }
}