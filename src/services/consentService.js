import mongoose from 'mongoose';
import Consent from "../models/consentModel.js";
import Customer from "../models/customerModel.js";
import CounterService from './counterService.js';

export const createConsent = async (consentData) => {
   const session = await mongoose.startSession(); 
   session.startTransaction();

   try {
      const { cpf, fullName, email, expirationDateTime } = consentData;

      let customer = await Customer.findOne({ cpf: cpf }).session(session);

      if (!customer) {
         const seqNumber = await CounterService.getNextSequence('customer', { session });
         const newId = `cus_${seqNumber}`;

         customer = new Customer({
            _id: newId,
            cpf: cpf,
            name: fullName,
            email: email
         });
         
         await customer.save({ session: session });
      }

      const existingActiveConsent = await Consent.findOne({
         customerId: customer._id,
         status: 'ACTIVE'
      }).session(session); 

      if (existingActiveConsent) {
         throw new Error('This customer already has an active consent.');
      }

      const seqNumber = await CounterService.getNextSequence('consent', { session });
      const newId = `con_${seqNumber}`;

      const newConsent = new Consent({
         _id: newId,
         customerId: customer._id, 
         expirationDateTime: expirationDateTime 
      });
      
      const savedConsent = await newConsent.save({ session });

      await session.commitTransaction();
      
      return savedConsent;

   } catch (error) {
      await session.abortTransaction();
      
      throw error;

   } finally {
      session.endSession();
   }
};

export const getByConsentId = async (consentId) => {
   const consent = await Consent.findById(consentId);

   return consent;
}

export const getConsentByCustomerId = async (customerId) => {
   const customerExists = await Customer.findById(customerId);
   if (!customerExists) {
      throw new Error('Customer not found');
   }

   const consent = await Consent.findOne({ 
      customerId: customerId,
      status: 'ACTIVE' 
   });

   return consent;
}

export const revokeConsentById = async (consentId) => {
   const consent = await Consent.findById(consentId);

   if (!consent) {
      throw new Error('Consent not found.');
   }

   if (consent.status !== 'ACTIVE') {
      throw new Error('Only active consents can be revoked.');
   }

   consent.status = 'REVOKED';
   consent.revocationDateTime = new Date(); 

   await consent.save();
   return consent;
};