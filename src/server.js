import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const connectOptions = {
  connectTimeoutMS: 30000,          
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000            
};

mongoose.connect(MONGO_URL, connectOptions)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));
