import Consent from '../models/consentModel.js';
import Account from '../models/accountModel.js';
import { InvestmentPosition } from "../models/investments/investmentModel.base.js";

/**
 * Factory function que cria o middleware de checagem de consentimento.
 * @param {string[]} requiredPermissions - Um array de permissões (ex: ['ACCOUNTS_READ'])
 */
export const checkConsent = (requiredPermissions = []) => {
  return async (req, res, next) => {
      try {
         let customerId;

         if (req.params.customerId) {
            customerId = req.params.customerId;

         } else if (req.params.accountId) {
            const account = await Account.findById(req.params.accountId).select('customerId');
            if (!account) return res.status(404).json({ success: false, error: 'Account not found.' });
            customerId = account.customerId;
         
         } else if (req.params.investmentId) {
            const investment = await InvestmentPosition.findById(req.params.investmentId);
            if (!investment) return res.status(404).json({ success: false, error: 'Investment not found.' });
            
            const account = await Account.findById(investment.accountId).select('customerId');
    
            if (!account) {
               return res.status(404).json({ success: false, error: 'Associated account not found for this investment.' });
            }

            customerId = account.customerId;
            req.preLoadedResource = investment; 

         } else if (req.body && req.body.accountId) {
            const account = await Account.findById(req.body.accountId).select('customerId');
            if (!account) return res.status(404).json({ success: false, error: 'Account provided in body not found.' });
            customerId = account.customerId;
         }
         
         if (!customerId) {
            return res.status(400).json({ 
               success: false, 
               error: 'Context undefined. Please provide customerId (params), accountId (params/body) or investmentId.' 
            });
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