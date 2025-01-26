import { Request, Response } from 'express';
import { createPayment, createPaymentIntent, getAllPayments, getPaymentsByEmail } from './pay.service';
 

export const createPaymentIntentController = async (req: Request, res: Response) => {
  const { price } = req.body;
  try {
    const clientSecret = await createPaymentIntent(price);
    res.status(200).send({ clientSecret });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
};

export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPayments();
    res.status(200).send(payments);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve payments' });
  }
};

export const getPaymentsByEmailController = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const payments = await getPaymentsByEmail(email);
    res.status(200).send(payments);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve payments' });
  }
};

export const createPaymentController = async (req: Request, res: Response) => {
  const payment = req.body;
  try {
    const result = await createPayment(payment);
    res.status(201).send({ result });
  } catch (error) {
    res.status(500).send({ error: 'Failed to process payment' });
  }
};
