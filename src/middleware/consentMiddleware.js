import Consent from '../models/consentModel.js';
import Account from '../models/accountModel.js';
import Customer from '../models/customerModel.js'; 
import mongoose from 'mongoose';

/**
 * Factory function que cria o middleware de checagem de consentimento.
 * @param {string[]} requiredPermissions - Um array de permissões (ex: ['ACCOUNTS_READ'])
 */
export const checkConsent = (requiredPermissions = []) => {
  return async (req, res, next) => {
      try {
         let customerId;

         // Caso A: A rota é /customers/:customerId/...
         if (req.params.customerId) {
            customerId = req.params.customerId; 
         
         } else if (req.params.id && !req.params.accountId) { 
            const isCustomer = await Customer.findById(req.params.id);
            if (isCustomer) {
               customerId = req.params.id;
            }

         } else if (req.params.accountId) {
            const account = await Account.findById(req.params.accountId).select('customerId');
            
            if (!account) {
               return res.status(404).json({ success: false, error: 'Account not found.' });
            }
            customerId = account.customerId;
         }

         if (!customerId) {
            return res.status(400).json({ success: false, error: 'Could not determine Customer ID from route parameters.' });
         }

         const consent = await Consent.findOne({
            customerId: customerId,
            status: 'AUTHORIZED', 
            expirationDateTime: { $gt: new Date() } 
         });

         if (!consent) {
            return res.status(403).json({ 
               success: false, 
               error: 'Forbidden: No active and authorized consent found for this customer.' 
            });
         }

         const hasAllPermissions = requiredPermissions.every(perm =>
            consent.permissions.includes(perm)
         );

         if (!hasAllPermissions) {
            return res.status(403).json({
               success: false,
               error: `Forbidden: Consent does not include required permissions: [${requiredPermissions.join(', ')}]`
            });
         }

         req.customerId = customerId;
         req.consent = consent;
         
         next(); 
      } catch (error) {
         console.error('Consent Middleware Error:', error);
         res.status(500).json({ success: false, error: 'Internal server error during consent validation.' });
      }
  };
};