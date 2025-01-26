import { Request, Response } from 'express';
import { PaymentServices } from './pay.service';

export const payController = {
    async createPayment(req: Request, res: Response) {
        try {
            const { email, productIds, amount, transactionId } = req.body;
            const paymentData = { email, productIds, amount, transactionId };
            const payment = await PaymentServices.createPayment(paymentData);
            res.status(201).json({
                success: true,
                message: 'Payment created successfully',
                data: payment,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to create payment',
                error: err.message,
            });
        }
    },

    async getPaymentByTransactionId(req: Request, res: Response) {
        try {
            const { transactionId } = req.params;
            const payment = await PaymentServices.getPaymentByTransactionId(transactionId);
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: 'Payment not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Payment retrieved successfully',
                data: payment,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve payment',
                error: err.message,
            });
        }
    },
};
