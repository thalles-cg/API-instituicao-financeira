import mongoose from 'mongoose';
import Consent from "../models/consentModel.js";
import Customer from "../models/customerModel.js";
import CounterService from './counterService.js';

export const createConsent = async (consentData) => {
   const session = await mongoose.startSession(); 
   
   session.startTransaction();

   try {
      const customerExists = await Customer.findById(consentData.customerId).session(session);
      if (!customerExists) {
         throw new Error('Cannot create consent for a non-existent customer.');
      }
      
      const existingActiveConsent = await Consent.findOne({
         customerId: consentData.customerId,
         status: 'ACTIVE'
      }).session(session); 

      if (existingActiveConsent) {
         throw new Error('This customer already has an active consent.');
      }

      const seqNumber = await CounterService.getNextSequence('consent', { session });
      const newId = `con_${seqNumber}`;

      const newConsent = new Consent({
         ...consentData,
         _id: newId
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