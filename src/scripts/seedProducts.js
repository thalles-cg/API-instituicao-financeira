import mongoose from "mongoose";
import dotenv from "dotenv";
import { 
   CdbProduct, 
   StockProduct, 
   CryptoProduct, 
   FiiProduct, 
   FundProduct, 
   TreasuryProduct 
} from "../models/products/productModel.types.js";
import { InvestmentProduct } from "../models/products/productModel.base.js";

dotenv.config();

const seedProducts = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL);

      await InvestmentProduct.deleteMany({});

      const products = [
         new CdbProduct({
            _id: "prod_cdb_master_120",
            name: "CDB Banco Master 120% CDI",
            institution: "Banco Master",
            riskLevel: "LOW",
            rateType: "CDI",
            rateValue: 120,
            maturityDate: new Date("2027-12-31"),
            liquidity: "No Maturity",
            issuer: "Banco Master",
            minInvestmentAmount: 1000
         }),
         new CdbProduct({
            _id: "prod_cdb_itau_daily",
            name: "CDB Itaú Liq. Diária",
            institution: "Itaú",
            riskLevel: "LOW",
            rateType: "CDI",
            rateValue: 100,
            maturityDate: new Date("2025-12-31"),
            liquidity: "D+0",
            issuer: "Itaú Unibanco",
            minInvestmentAmount: 1
         }),
         new StockProduct({
            _id: "prod_stock_petr4",
            name: "Petrobras PN",
            institution: "B3",
            riskLevel: "HIGH",
            ticker: "PETR4",
            sector: "Energy",
            cnpj: "33.000.167/0001-01"
         }),
         new StockProduct({
            _id: "prod_stock_wege3",
            name: "WEG ON",
            institution: "B3",
            riskLevel: "MEDIUM",
            ticker: "WEGE3",
            sector: "Industrial Goods",
            cnpj: "84.429.695/0001-11"
         }),
         new CryptoProduct({
            _id: "prod_crypto_btc",
            name: "Bitcoin",
            institution: "Blockchain",
            riskLevel: "AGGRESSIVE",
            symbol: "BTC",
            network: "Bitcoin",
            description: "Reserva de valor digital descentralizada"
         }),
         new FiiProduct({
            _id: "prod_fii_hglg11",
            name: "CSHG Logística",
            institution: "B3",
            riskLevel: "MEDIUM",
            ticker: "HGLG11",
            admin: "Credit Suisse",
            segment: "Logística"
         }),
         new FiiProduct({
            _id: "prod_fii_mxrf11",
            name: "Maxi Renda",
            institution: "B3",
            riskLevel: "MEDIUM",
            ticker: "MXRF11",
            admin: "XP Vista Asset",
            segment: "Papel"
         }),
         new FundProduct({
            _id: "prod_fund_alaska",
            name: "Alaska Black FIC FIA",
            institution: "Alaska Asset",
            riskLevel: "HIGH",
            cnpj: "12987123000199",
            adminFee: 2.0,
            performanceFee: 20.0,
            category: "Ações Livre",
            minInvestmentAmount: 500
         }),
         new TreasuryProduct({
            _id: "prod_treasury_selic_2029",
            name: "Tesouro Selic 2029",
            institution: "Tesouro Nacional",
            riskLevel: "LOW",
            bondType: "SELIC",
            indexer: "SELIC",
            maturityDate: new Date("2029-03-01"),
            couponRate: 0,
            minInvestmentAmount: 150
         }),
         new TreasuryProduct({
            _id: "prod_treasury_ipca_2035",
            name: "Tesouro IPCA+ 2035",
            institution: "Tesouro Nacional",
            riskLevel: "LOW",
            bondType: "IPCA",
            indexer: "IPCA",
            maturityDate: new Date("2035-05-15"),
            couponRate: 6.2, 
            minInvestmentAmount: 30
         })
      ];
      await InvestmentProduct.insertMany(products);
      console.log(`${products.length} produtos inseridos com sucesso!`);

      process.exit(0);

   } catch (error) {
      console.error("Erro ao rodar seed:", error);
      process.exit(1);
   }
};

seedProducts();