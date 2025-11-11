import { createConsent, getByConsentId, getConsentByCustomerId, revokeConsentById } from "../services/consentService.js";

export const create = async (req, res) => {
   try {
      const { cpf, fullName, email } = req.body;

      if (!cpf || !fullName || !email) {
         return res.status(400).json({ 
            message: 'Os campos cpf, fullName e email são obrigatórios.' 
         });
      }
      
      const expirationDateTime = new Date();
      expirationDateTime.setFullYear(expirationDateTime.getFullYear() + 1);

      const consentData = {
         cpf,
         fullName,
         email,
         expirationDateTime
      };

      const newConsent = await createConsent(consentData);

      res.status(201).json({
         success: true,
         message: "Consent created successfully.",
         data: newConsent.toObject()
      });
   } catch (error) {
      console.error('Error creating consent:', error);

      if (error.message === 'This customer already has an active consent.') {
         return res.status(409).json({ message: error.message });
      }

      if (error.code === 11000) {
         const field = Object.keys(error.keyValue)[0];
         return res.status(409).json({
            success: false,
            message: `A customer with this ${field} already exists.`
         });
      }

      res.status(500).json({ success: false, message: 'An internal server error occurred.' });
   }
};

export const getById = async (req, res) => {
   try { 
      const { id } = req.params;
      const consent = await getByConsentId(id);

      if (!consent) {
         return res.status(404).json({
               success: false,
               message: 'Consent not found for the provided ID.'
         });
      }

      res.status(200).json({
         success: true,
         message: "Consent details found successfully.",
         data: consent
      });

   } catch (error) { 
      console.error('Error fetching consent by ID:', error);
      res.status(500).json({
         success: false,
         message: 'An internal server error occurred while fetching the consent.',
         error: error.message
      });
   }
}

export const getByCustomerId = async (req, res) => {
   try {
      const { customerId } = req.params;

      const consent = await getConsentByCustomerId(customerId);
      
      const message = consent 
            ? "Active consent found successfully." 
            : "No active consent found for this customer.";

      res.status(200).json({
         success: true,
         message: message,
         data: consent
      });

   } catch (error) {
      if (error.message === 'Customer not found') {
         return res.status(404).json({ success: false, error: error.message });
      }
      res.status(500).json({ success: false, message: 'Failed to fetch consent data.', details: error.message });
   }
}

export const revoke = async (req, res) => {
   try {
      const { id } = req.params;
      const revokedConsent = await revokeConsentById(id);

      res.status(200).json({
         success: true,
         message: "Consent revoked successfully.",
         data: revokedConsent
      });

   } catch (error) {
      console.error('Error revoking consent:', error);

      if (error.message === 'Consent not found.') {
         return res.status(404).json({ success: false, message: error.message });
      }
      
      if (error.message === 'Only active consents can be revoked.') {
         return res.status(400).json({ success: false, message: error.message });
      }

      res.status(500).json({ success: false, message: 'An internal server error occurred.' });
   }
};