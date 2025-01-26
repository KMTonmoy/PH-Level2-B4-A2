import express from 'express';
import { payController } from './pay.controller';
  
const router = express.Router();

router.post('/payments', payController.createPayment);

router.get('/payments/:transactionId', payController.getPaymentByTransactionId);

export const PaymentRoutes = router;
