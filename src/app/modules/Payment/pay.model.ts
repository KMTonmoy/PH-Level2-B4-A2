import mongoose, { Document, Schema } from 'mongoose';
import { Payment } from './pay.interface';
 
const paymentSchema: Schema = new Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentMethodId: { type: String, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const PaymentModel = mongoose.model<Payment & Document>('Payment', paymentSchema);

export default PaymentModel;
