import { PaymentDocument, PaymentModel } from "./pay.model";

 
export const PaymentServices = {
    // Save a new payment to the database
    async createPayment(paymentData: {
        email: string;
        productIds: string[];
        amount: number;
        transactionId: string;
    }): Promise<PaymentDocument> {
        try {
            const payment = new PaymentModel(paymentData);
            return await payment.save();
        } catch (err) {
            console.error('Error creating payment:', err);
            throw new Error('Failed to create payment');
        }
    },

    // Retrieve payment details by transaction ID
    async getPaymentByTransactionId(transactionId: string): Promise<PaymentDocument | null> {
        try {
            const payment = await PaymentModel.findOne({ transactionId });
            return payment;
        } catch (err) {
            console.error('Error retrieving payment:', err);
            throw new Error('Failed to retrieve payment');
        }
    },
};
