import { InvestmentProduct } from "../models/products/productModel.base.js";

export const getAllProducts = async (filters = {}) => {
   const query = { active: true }; 
   
   if (filters.type) {
      query.productType = filters.type.toUpperCase();
   }

   return await InvestmentProduct.find(query).lean();
};

export const getProductById = async (id) => {
   return await InvestmentProduct.findById(id).lean();
};