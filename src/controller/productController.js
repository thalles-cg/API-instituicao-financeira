import * as ProductService from "../services/productService.js";

export const listProducts = async (req, res) => {
   try {
      const filters = {
         type: req.query.type 
      };

      const products = await ProductService.getAllProducts(filters);
      
      return res.status(200).json({
         success: true,
         count: products.length,
         products 
      });

   } catch (error) {
      console.error("Error listing products:", error);
      return res.status(500).json({
         success: false,
         error: "Unable to retrieve product catalog."
      });
   }
};

export const getProductById = async (req, res) => {
   try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);

      if (!product) {
         return res.status(404).json({ success: false, error: "Product not found." });
      }

      return res.status(200).json({ success: true, product });

   } catch (error) {
      console.error("Error getting product:", error);
      return res.status(500).json({
         success: false,
         error: "Internal server error."
      });
   }
};