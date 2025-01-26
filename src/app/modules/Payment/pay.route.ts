import express from 'express';
import { createPaymentController, createPaymentIntentController, getAllPaymentsController, getPaymentsByEmailController } from './pay.controller';

 
const router = express.Router();

router.post('/create-payment-intent', createPaymentIntentController);
router.get('/payments', getAllPaymentsController);
router.get('/payments/:email', getPaymentsByEmailController);
router.post('/payments', createPaymentController);


 




export const PayRoutes = router;
