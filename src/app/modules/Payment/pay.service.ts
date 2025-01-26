import Stripe from 'stripe';
import PaymentModel from './pay.model';
import { Payment } from './pay.interface';


const stripe = new Stripe("sk_test_51PLRDh1ER2eQQaKO62FDISx1JSEYIssRAxTTkCbDLF9dwtr65GpWuRQNbx7WTOCRLEqIH8TH7oyPWDiDeiembWQp00Lbh4F97W", { apiVersion: '2022-11-15' });

export const createPaymentIntent = async (price: number) => {
    const amount = Math.round(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    return paymentIntent.client_secret;
};

export const getAllPayments = async () => {
    return await PaymentModel.find();
};

export const getPaymentsByEmail = async (email: string) => {
    return await PaymentModel.find({ email });
};

export const createPayment = async (payment: Payment) => {
    const newPayment = new PaymentModel(payment);
    return await newPayment.save();
};
