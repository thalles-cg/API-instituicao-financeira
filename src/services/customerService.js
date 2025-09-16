import Customer from "../models/customerModel.js";

export const createCustomer = async (customerData) => {
   const newCustomer = new Customer(customerData);
   const savedCustomer = await newCustomer.save();

   return savedCustomer;
};