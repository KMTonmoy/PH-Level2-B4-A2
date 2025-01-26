import mongoose, { Schema, Document } from 'mongoose';

export interface PaymentDocument extends Document {
    email: string; // User's email
    productIds: string[]; // Array of product IDs
    amount: number; // Total payment amount
    transactionId: string; // Stripe transaction ID
    createdAt: Date; // Timestamp of payment creation
}

const PaymentSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        productIds: { type: [String], required: true }, // Array of product IDs
        amount: { type: Number, required: true }, // Payment amount
        transactionId: { type: String, required: true, unique: true }, // Unique transaction ID
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export const PaymentModel = mongoose.model<PaymentDocument>('Payment', PaymentSchema);
